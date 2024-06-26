"use client";
import { useState, useEffect, useReducer, memo, useMemo } from "react";
// import { debounce, throttle } from "throttle-debounce";

import { DropDownWrapper } from "./DropDownWrapper";
import { NovaPostInput } from "./NovaPostInput";
import { doFetchOnNovaPost } from "@/shared/helpers/service-post-api";

import { reducerNp } from "./npReducer";
import { objectStateKeys } from "./enums/keys";
import { initialState } from "./enums/inittialState";

import style from "./Styles.module.scss";

const NovaPostA = () => {
  var [state, dispatch] = useReducer(reducerNp, initialState);

  const [isToggle, setIsToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOffice, setIsOpenOffice] = useState(false);

  var getCity = useMemo(
    () => async (city) => {
      var obj = {
        apiKey: process.env.NV_API_KEY,
        modelName: "Address",
        calledMethod: "getSettlements",
        methodProperties: {
          AreaRef: state[objectStateKeys.REGION_REF],
          Page: "1",
          FindByString: city,
          Limit: "40",
        },
      };

      doFetchOnNovaPost(obj).then((data) =>
        dispatch({ data: data, keys: objectStateKeys.DATA_CITY })
      );
    },
    []
  );

  var getPostOffice = async (postOffice) => {
    var obj = {
      apiKey: process.env.NV_API_KEY,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        FindByString: postOffice,
        CityName: state[objectStateKeys.CITY_NAME],
        Page: "1",
        Limit: "150",
        Language: "UA",
      },
    };
    doFetchOnNovaPost(obj).then((data) =>
      dispatch({ data: data, keys: objectStateKeys.POST_OFFICE_DATA })
    );
  };

  var getRegion = useMemo(
    () => () => {
      var obj = {
        apiKey: process.env.NV_API_KEY,
        modelName: "Address",
        calledMethod: "getSettlementAreas",
        methodProperties: {
          Ref: "",
        },
      };
      doFetchOnNovaPost(obj).then((data) =>
        dispatch({ data: data, keys: objectStateKeys.DATA_REGION })
      );
    },
    []
  );

  var onClickOnRegion = (item) => {
    setIsToggle(!isToggle);

    dispatch({
      data: item.Ref,
      keys: objectStateKeys.REGION_REF,
    });
    dispatch({
      data: item.Description,
      keys: objectStateKeys.REGION_NAME,
    });
  };

  var onClickOnCity = (item) => {
    dispatch({ data: item.Ref, keys: objectStateKeys.CITY_REF });
    dispatch({
      data: item.Description,
      keys: objectStateKeys.CITY_NAME,
    });
    setIsOpen(!isOpen);
  };

  var onClickOnPostOffice = (item) => {
    setIsOpenOffice(!isOpenOffice);
    dispatch({
      data: item.Description,
      keys: objectStateKeys.POST_OFFICE,
    });
  };

  useEffect(() => getRegion(), []);

  useEffect(() => {
    var city = state[objectStateKeys.CITY_NAME];

    Boolean(city) && getCity(city);
  }, [state[objectStateKeys.CITY_NAME]]);

  useEffect(() => {
    var office = state[objectStateKeys.POST_OFFICE];

    Boolean(office) && getPostOffice(office);
  }, [state[objectStateKeys.POST_OFFICE]]);

  return (
    <div
      style={{
        width: "290px",
      }}
    >
      <h3>
        <strong style={{color: "#F92D2D"}}>Нова Пошта</strong>
      </h3>

      <div
        style={{
          display: "flex",
          gap: "23px",
          flexDirection: "column",
          // marginBottom: "100px",
          color: "black",
          paddingTop: "25px",
        }}
      >
        <div style={{position: "relative"}}>
        <NovaPostInput
          onClick={() => setIsToggle(!isToggle)}
          value={state[objectStateKeys.REGION_NAME]}
          placeholder={"Виберіть область"}
          readOnly={true}
        >
        </NovaPostInput>

        {Boolean(state[objectStateKeys.DATA_REGION].length) && isToggle && (
          <ul
            key="listRegion"
              style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "290px",
              height: "196px",
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              overflowY: "scroll",
              position: "absolute",
              background: "#fff",
              border: "1px solid #209487",
              borderRadius: "8px",
              paddingLeft: "26px",
              paddingTop: "16px",
              paddingBottom: "16px",
                zIndex: "2",
            }}
          >
            <DropDownWrapper
              dataMap={state[objectStateKeys.DATA_REGION]}
              onEvent={onClickOnRegion}
              key="dropDownRegion"
              classname={style}
            />
          </ul>
          )}
          </div>
        <div style={{position: "relative"}}>

        <NovaPostInput
          onClick={() => setIsOpen(true)}
          value={state[objectStateKeys.CITY_NAME]}
          placeholder={"Місто"}
          onChange={(event) => {
            dispatch({
              data: event.currentTarget.value,
              keys: objectStateKeys.CITY_NAME,
            });
          }}
        >
          
        </NovaPostInput>

        {Boolean(state[objectStateKeys.DATA_CITY].length) && isOpen && (
          <ul
            key="listCity"
            style={{
              position: "absolute",
              top: "40px",
              left: "0",
              width: "290px",
              height: "196px",
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              overflowY: "scroll",
              background: "#fff",
              border: "1px solid #209487",
              borderRadius: "8px",
              paddingLeft: "26px",
              paddingTop: "16px",
              paddingBottom: "16px",
              zIndex: "2",

            }}
          >
            <DropDownWrapper
              dataMap={state[objectStateKeys.DATA_CITY]}
              onEvent={onClickOnCity}
              key="dropDownCity"
            />
          </ul>
        )}
        </div>
        <div style={{position: "relative"}}>
        
        <NovaPostInput
          value={state[objectStateKeys.POST_OFFICE]}
          onClick={() => setIsOpenOffice(true)}
          placeholder={"Вибрати відділення"}

          onChange={(event) =>
            dispatch({
              data: event.currentTarget.value,
              keys: objectStateKeys.POST_OFFICE,
            })
          }
        >
          
        </NovaPostInput>

        {Boolean(state[objectStateKeys.POST_OFFICE_DATA].length) &&
          isOpenOffice && (
            <ul
              key="listOffice"
            
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                width: "290px",
                height: "196px",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                overflowY: "scroll",
                background: "#fff",
                border: "1px solid #209487",
                borderRadius: "8px",
                paddingLeft: "26px",
                paddingTop: "16px",
                paddingBottom: "16px",
                zIndex: "2",
              }}
            >
              <DropDownWrapper
                dataMap={state[objectStateKeys.POST_OFFICE_DATA]}
                onEvent={onClickOnPostOffice}
                key="dropDownOffice"
                classname="drop"
              />
            </ul>
            )}
          </div>
      </div>
    </div>
  );
};

var MeMoNovaPost = memo(NovaPostA);

export { MeMoNovaPost };
