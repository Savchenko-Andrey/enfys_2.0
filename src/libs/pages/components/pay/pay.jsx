"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Liqpay } from "@/libs/components/liqpay/Liqpay";
import { MeMoNovaPost } from "@/libs/components/nova-post-api/NovaPostA";

import styles from "./pay.module.scss";
import PayModal from "@/libs/modal/modal-pay/modal-pay";
import checked from "@/assets/svg/check.svg";

import cornerRightOrange from '@/assets/svg/corner-right-green.svg';
import cornerLeftOrange from '@/assets/svg/corner-left-green.svg';
import starsLeft from '@/assets/svg/stars-left.svg';
import starsRight from '@/assets/svg/stars-right.svg';



export default function Pay() {
  const [storedItems, setStoredItems] = useState([]);
  const [isPay, setIsPay] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    var localeData = JSON.parse(localStorage.getItem("storedItems"));
    localeData && setStoredItems(localeData);
  }, []);

  useEffect(() => {
    setStoredItems(JSON.parse(localStorage.getItem("storedItems")));
  }, [isPay]);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitted data:", formData);
    // Тут можно добавить логику для отправки данных на сервер
  };

  const totalCardPrice = storedItems.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.PriceCards * item.QuantityCards);
  }, 0);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.container_form}>
            <h2 className={styles.title}>Ваші контактні дані</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.container_input}>
                <input
                  className={styles.input}
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Ім’я"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  className={styles.input}
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Прізвище"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.container_input}>
                <input
                  className={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.delivery}>
                <p className={styles.text_delivery}>Доставка</p>
                <p className={`${styles.text_delivery} ${styles.tab}`}>Спосіб оплати</p>
              </div>
              <div className={styles.container_radio}>
                <MeMoNovaPost />
                <div className={styles.container_radio_adaptive}>
                  <div className={`${styles.delivery} ${styles.mob}`}>
                    <p className={styles.text_delivery}>Спосіб оплати</p>
                  </div>
                  <div className={styles.radio}>
                    <input type="radio" id="radio-site" className={styles.check} />
                    <label htmlFor="radio-site" className={styles.label_radio}>
                      Оплата на сайті
                    </label>
                  </div>
                  <div className={styles.radio}>
                    <input type="radio" id="radio-post" className={styles.check} />
                    <label htmlFor="radio-post" className={styles.label_radio}>
                      Наложенний платіж
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.container_cards}>
        <div className={styles.corner_left}>
          <Image
            src={cornerLeftOrange}
            alt="pay"
            priority={true}
            loading="eager"
          />
        </div>
        <div className={styles.corner_right}>
          <Image
            src={cornerRightOrange}
            alt="pay"
            priority={true}
            loading="eager"
          />
        </div>
        <div className={styles.stars_left}>
          <Image
            src={starsLeft}
            alt="stars"
            priority={true}
            loading="eager"
          />
        </div>
        <div className={styles.stars_right}>
          <Image
            src={starsRight}
            alt="stars"
            priority={true}
            loading="eager"
          />
        </div>
            <h2
              className={styles.title}
              style={{ color: "#FAF7F1", paddingBottom: "33px" }}
            >
              Ваше замовлення
            </h2>
            <div className={styles.container_contant}>
              <div className={styles.item_description}>
                <p className={styles.item_text}>Кількість</p>
                <p className={styles.item_text}>Сума</p>
              </div>
              <ul className={styles.list}>
                {storedItems.map(
                  (
                    { ImageCards, TitleCards, PriceCards, QuantityCards },
                    id
                  ) => (
                    <li key={id} className={styles.item}>
                      <Image
                        src={ImageCards}
                        alt="Image"
                        priority={true}
                        loading="eager"
                        quality={100}
                        width={100}
                        height={100}
                        className={styles.item_img}
                      />
                      <p className={styles.item_title}>{TitleCards}</p>
                      <div className={styles.item_quantity}>
                        <div className={styles.container_quantity}>
                          <p className={styles.text}>{QuantityCards}</p>
                        </div>
                      </div>
                      <div className={styles.item_container_price}>
                        <p className={styles.price}>
                          {PriceCards * QuantityCards} гривень
                        </p>
                      </div>
                    </li>
                  )
                )}
              </ul>
              <div className={styles.container_price}>
                <p className={styles.text}>Підсумок</p>
                <p className={styles.price}>{totalCardPrice} ГРИВЕНЬ</p>
              </div>
            </div>

            <div className={styles.container_btn}>
              <Liqpay />
              <button
                className={styles.btn_edit}
                onClick={() => setIsPay(true)}
              >
                редагувати замовлення
              </button>
            </div>
          </div>
        </div>
      </section>
      {isPay && (
        <PayModal
          setIsPay={setIsPay}
          storedItems={storedItems}
          setStoredItems={setStoredItems}
        />
      )}
    </>
  );
}
