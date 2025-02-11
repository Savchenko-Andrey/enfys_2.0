"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import style from "./Hero.module.scss";
import Link from "next/link";


import Img from "@/assets/svg/hero.png";

import ImgAbout from "@/assets/svg/hero-about.png";
import ImgContacts from "@/assets/svg/hero-contacts.png";
import ImgReviews from "@/assets/svg/reviews-hero.png";
import ImgPrice from "@/assets/svg/hero-price.png";
import starsLeft from '@/assets/svg/stars-left.svg';
import starsRight from '@/assets/svg/stars-right.svg';


import logo from "@/assets/svg/logo.svg";

import Line from "@/shared/line";
import useScrollPosition from "@/shared/hook/useScrollPosition";

const homeText = "НАСОЛОДЖУЙСЯ МАТЕРИНСТВОМ з ENFyS";
const aboutText = "ENFyS - це ідеальне поєднання ціни та якості";
const contactsText = "зв’яжіться з нами - з радістю доможемо";
const reviewsText = "відгуки про магазин";
const priceText = "прогулянкові візочки";


export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  const [isHero, setIsHero] = useState(Img);
  const [isHeroText, setIsHeroText] = useState(homeText);
  const [isHeroCards, setIsHeroCards] = useState(false);

  useScrollPosition(usePathname());

  const path = usePathname().replace("/", "");
  
  const priceCard = path.includes("price");

  useEffect(() => {
    switch (path) {
    
      case "about":
        setIsHero(ImgAbout);
        setIsHeroText(aboutText)
        break;
      
      case "contacts":
        setIsHero(ImgContacts);
        setIsHeroText(contactsText)
        break;
      
      case "reviews":
        setIsHero(ImgReviews);
        setIsHeroText(reviewsText)
        break;
      
      default:
        setIsHero(Img);
        setIsHeroText(homeText);
        setIsHeroCards(false);
        break;
    }
  }, [path]);

  useEffect(() => {
    switch (true) { 
      case priceCard:
        setIsHero(ImgPrice);
        setIsHeroText(priceText);
        setIsHeroCards(true);
      break;
    }
    setIsClient(true);
  }, [])

  return (
    <>
    {isClient && 
      <section className={style.section}>
        <div className={style.container} style={isHeroCards ? { height: "240px" } : {}}>
          <h1 className={style.title} style={{ display: "none" }}>ENFYS</h1>
          <div className={style.hero_line_color_green}></div>
          <div className={style.hero_line_color_red}></div>
          <div className={style.hero_line_color_yellow}></div>
          <Link href={"/"} style={{ position: "relative", zIndex: "11" }}>
            <Image
              src={logo}
              alt="Logo"
              priority={true}
              loading="eager"
              quality={100}
              className={style.logo}
            />
          </Link>
          <p className={style.description} style={isHeroCards ? { marginBottom: "0px" } : {}}>{isHeroText}
          <div className={style.stars_left}>
            <Image
              src={starsLeft}
              alt="stars"
              priority={true}
              loading="eager"
            />
          </div>
          <div className={style.stars_right}>
            <Image
              src={starsRight}
              alt="stars"
              priority={true}
              loading="eager"
            />
          </div>
          </p>
          
          <div className={style.bacground} style={isHeroCards ? { height: "240px" } : {}}></div>

          <div className={style.bacground_img} style={isHeroCards ? { height: "240px" } : {}}>
            {isClient &&
              <Image
                src={isHero}
                alt="Image"
                fill
                priority={true}
                loading="eager"
                quality={100}
                className={style.img}
              />
            }
          </div>
        </div>
        <div style={{ position: 'absolute' }} >
          <Line />
        </div>
      </section>
      }
    </>
  );
}
