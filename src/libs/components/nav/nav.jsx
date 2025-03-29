"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "./nav.module.scss"

import arrow from '@/assets/svg/arrow.svg';

import facebook from '@/assets/svg/icons/facebook.svg';
import instagram from '@/assets/svg/icons/instagram.svg';
import youtube from '@/assets/svg/icons/youtube.svg';
import viber from '@/assets/svg/icons/viber.svg';

import language from '@/assets/svg/icons/language.svg';
import convenience from '@/assets/svg/icons/convenience.svg';

const social = [
  {
    icon: facebook,
    link: "https://facebook.com/enfys.babyshop"
  },
  {
    icon: instagram,
    link: "https://instagram.com/enfys.babyshop"
  },
  {
    icon: youtube,
    link: "https://www.youtube.com/channel/UCqi-BAHEeJ8Iwlm9ut5-Zqw/"
  },
  {
    icon: viber,
    link: "viber://chat?number=%2B380938138818"
  },
];


import { shop, strollers, furniture, accessories, transport, textile, toys, backpacks } from '@/shared/list';

export default function Nav({ setIsMenu, setIsPay }) {
  const [isStrollers, setIsStrollers] = useState(false);
  const [isFurniture, setIsFurniture] = useState(false);
  const [isAccessories, setIsAccessories] = useState(false);
  const [isTransport, setIsTransport] = useState(false);
  const [isTextile, setIsTextile] = useState(false);

  const [updatePrice, setUpdatePrice] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theFuckingBigData = JSON.parse(localStorage.getItem("storedItems")) || [];

      const price = theFuckingBigData.reduce((accumulator, item) => {
        return accumulator + parseFloat(item.QuantityCards);
      }, 0);

      setUpdatePrice(price);
    }
  }, []);

  const strollersArrow = () => {
    setIsStrollers(!isStrollers);
    setIsFurniture(false);
    setIsAccessories(false);
    setIsTransport(false);
    setIsTextile(false);
  }

  const furnitureArrow = () => {
    setIsFurniture(!isFurniture);
    setIsStrollers(false);
    setIsAccessories(false);
    setIsTransport(false);
    setIsTextile(false);
  }

  const accessoriesArrow = () => {
    setIsAccessories(!isAccessories);
    setIsStrollers(false);
    setIsFurniture(false);
    setIsTransport(false);
    setIsTextile(false);
  }

  const transportArrow = () => {
    setIsTransport(!isTransport);
    setIsStrollers(false);
    setIsFurniture(false);
    setIsAccessories(false);
    setIsTextile(false);
  }

  const textileArrow = () => {
    setIsTextile(!isTextile);
    setIsStrollers(false);
    setIsFurniture(false);
    setIsAccessories(false);
    setIsTransport(false);
  }

  return (
    <>
    <div className={styles.container}>
      {/* shop */}
      
      <ul className={styles.list}>
        {shop.map((item, id) => (
          <li key={id}>
            <Link onClick={()=> setIsMenu(false)} href={item.link} className={styles.title}>{item.title}</Link>
          </li>
        ))}
      </ul>

      {/* strollers */}
      <ul className={styles.list}>
      {strollers.map(({title, link, list}, id) => (
        <li key={id}>
          <div style={{display: "flex", position: "relative"}}>
            <Link onClick={()=> setIsMenu(false)} href={link} className={styles.title}>{title}</Link>
            <div style={isStrollers ? { transform: "rotate( 0deg)" } : {}}
              onClick={strollersArrow}
              className={styles.arrow}>
              <Image 
                src={arrow}
                alt="arrow"
                priority={true}
                fill
                loading="eager"
                quality={100}
                className={styles.arrow_icon}
              />
            </div>
          </div>
          <ul className={`${styles.list_text} ${isStrollers ? styles.list_text_animations : "" }`}>
            {list.map(({item, link}, id) => (
              <li key={id}>
                <Link onClick={()=> setIsMenu(false)} href={link} className={styles.text}>{item}</Link>
              </li>
            ))}
          </ul>
        </li >
      ))}
        
      {/* furniture */}
      {furniture.map(({title, link, list}, id) => (
        <li key={id}>
          <div style={{display: "flex", position: "relative"}}>
            <Link onClick={()=> setIsMenu(false)} href={link} className={styles.title}>{title}</Link>
            <div style={isFurniture ? { transform: "rotate( 0deg)" } : {}}
              onClick={furnitureArrow}
              className={styles.arrow}>
              <Image 
                src={arrow}
                alt="arrow"
                priority={true}
                fill
                loading="eager"
                quality={100}
                className={styles.arrow_icon}
              />
            </div>
          </div>
          <ul className={`${styles.list_text} ${isFurniture ? styles.list_text_animations : "" }`}>
            {list.map(({item, link}, id) => (
              <li key={id}>
                <Link onClick={()=> setIsMenu(false)} href={link} className={styles.text}>{item}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
        
      {/* accessories */}
      {accessories.map(({title, link, list}, id) => (
        <li key={id}>
          <div style={{display: "flex", position: "relative"}}>
            <Link onClick={()=> setIsMenu(false)} href={link} className={styles.title}>{title}</Link>
            <div style={isAccessories ? { transform: "rotate( 0deg)" } : {}}
              onClick={accessoriesArrow}
              className={styles.arrow}>
              <Image 
                src={arrow}
                alt="arrow"
                fill
                priority={true}
                loading="eager"
                quality={100}
                className={styles.arrow_icon}
              />
            </div>
          </div>
          <ul className={`${styles.list_text} ${isAccessories ? styles.list_text_animations : "" }`}>
            {list.map(({item, link}, id) => (
              <li key={id}>
                <Link onClick={()=> setIsMenu(false)} href={link} className={styles.text}>{item}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
      </ul>

      {/* transport */}
      <ul className={styles.list}>
        {transport.map(({title, link, list}, id) => (
        <li key={id}>
          <div style={{display: "flex", position: "relative"}}>
            <Link onClick={()=> setIsMenu(false)} href={link} className={styles.title}>{title}</Link>
            <div style={isTransport ? { transform: "rotate( 0deg)" } : {}}
              onClick={transportArrow}
                className={styles.arrow}>
                <Image 
                  src={arrow}
                  alt="arrow"
                  priority={true}
                  loading="eager"
                  fill
                  quality={100}
                  className={styles.arrow_icon}
                />
            </div>
          </div>
          <ul className={`${styles.list_text} ${isTransport ? styles.list_text_animations : "" }`}>
            {list.map(({item, link}, id) => (
              <li key={id}>
                <Link onClick={()=> setIsMenu(false)} href={link} className={styles.text}>{item}</Link>
              </li>
            ))}
          </ul>
        </li>
        ))}

        {/* textile */}
        {textile.map(({title, link, list}, id) => (
        <li key={id}>
          <div style={{display: "flex", position: "relative"}}>
            <Link onClick={()=> setIsMenu(false)} href={link} className={styles.title}>{title}</Link>
            <div style={isTextile ? { transform: "rotate( 0deg)" } : {}}
              onClick={textileArrow}
                className={styles.arrow}>
                <Image 
                  src={arrow}
                  alt="arrow"
                  priority={true}
                  loading="eager"
                  fill
                  quality={100}
                  className={styles.arrow_icon}
                />
            </div>
          </div>
            <ul className={`${styles.list_text} ${isTextile ? styles.list_text_animations : "" }`}>
            {list.map(({item, link}, id) => (
              <li key={id}>
                <Link onClick={()=> setIsMenu(false)} href={link} className={styles.text}>{item}</Link>
              </li>
            ))}
          </ul>
        </li>
        ))}
      {toys.map(({title, link, list}, id) => (
        <li key={id}>
          <Link onClick={()=> setIsMenu(false)} href={link} className={styles.title}>{title}</Link>
        </li>
        ))}
      {backpacks.map(({title, link, list}, id) => (
        <li key={id}>
          <Link onClick={()=> setIsMenu(false)} href={link} className={styles.title}>{title}</Link>
        </li>
        ))}
      </ul>
      <div className={styles.margin_top_icon}>

        {/* icon */}
      <ul className={styles.list_icon}>
        {social.map(({icon, link}, id) => (
        <li key={id}>
          <Link href={link} target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <Image 
                src={icon}
                alt="icon"
                priority={true}
                loading="eager"
              />
          </Link>
        </li>
      ))}

        <li className={styles.icon_mob}>
          <div style={{position: "relative", cursor: "pointer"}}>
            <Image 
                src={language}
                alt="language"
                priority={true}
                loading="eager"
              />
          </div>
        </li>
        <li>
          <div style={{position: "relative", cursor: "pointer"}} onClick={()=> setIsPay(true) & setIsMenu(false)}>
            <Image 
                src={convenience}
                alt="convenience"
                priority={true}
                loading="eager"
                />
                {updatePrice !== 0 ? <div className={styles.quantyti_item}>
                  <p style={{ fontSize: "4px", fontWeight: "700" }}>{updatePrice}</p>
                </div>
                :
                ""
              }
          </div>
        </li>
        </ul>
        
      {/* input */}
        <div className={styles.input_container}>
          <svg style={{ position: "absolute", right: "12px", top: "4px" }}
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M15.5 14H14.71L14.43 13.73C15.4439 12.554 16.0011 11.0527 16 9.5C16 8.21442 15.6188 6.95772 14.9046 5.8888C14.1903 4.81988 13.1752 3.98676 11.9874 3.49479C10.7997 3.00282 9.49279 2.87409 8.23192 3.1249C6.97104 3.3757 5.81285 3.99477 4.90381 4.90381C3.99477 5.81285 3.3757 6.97104 3.1249 8.23192C2.87409 9.49279 3.00282 10.7997 3.49479 11.9874C3.98676 13.1752 4.81988 14.1903 5.8888 14.9046C6.95772 15.6188 8.21442 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="white"/>
          </svg>
          <input type="text" className={styles.input} placeholder="шукайте товари" />
        </div>
      </div>
      </div>
      </>
  );
}
