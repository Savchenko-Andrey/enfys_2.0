import styles from "./Footer.module.scss"

import Image from "next/image";
import Link from "next/link";

import Line from '@/shared/line'
import logo from "@/assets/svg/logo.svg";
import bank from "@/assets/svg/bank.svg";


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


export default function Footer() {
  return (
    <section className={styles.section} style={{ background: "#FAF7F1" }}>
      <div style={{position: "absolute", top: "0"}}>
          <Line />
        </div>
      <div className={styles.container}>
        <div className={styles.container_img}>
          <Image 
            src={logo}
            alt="Logo"
            priority={true}
            loading="eager"
            quality={100}
            className={styles.img}
          />
          {/* contacts */}
          <div className={styles.container_contacts}>
            <p className={styles.title_contacts}>Телефон:</p>
            <a className={styles.text} href="tel:0938138818">(093) 813-88-18</a>
            <span className={`${styles.text} ${styles.tel_mob_none}`}>/</span>
            <a className={`${styles.text} ${styles.tel_mob}`} href="tel:0954366613">(095) 436-66-13</a>
          </div>
        </div>
          {/* info */}
          <div>
            <ul className={styles.container_icon}>
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
                {/* <li className={styles.icon}>
                <div style={{position: "relative", cursor: "pointer"}}>
                  <Image 
                      src={language}
                      alt="language"
                      priority={true}
                      loading="eager"
                      style={{width: "25px", height: "25px"}}
                    />
                </div>
              </li>
              <li className={styles.icon}>
                <div style={{position: "relative", cursor: "pointer"}}>
                  <Image 
                      src={convenience}
                      alt="convenience"
                      priority={true}
                      loading="eager"
                      style={{width: "25px", height: "25px"}}
                    />
                </div>
              </li> */}
            </ul>

            <ul>
              <li><a className={styles.text} href="/">Доставка та оплата</a></li>
              <li><a className={styles.text} href="/">Пакунок малюка</a></li>
              <li><a className={styles.text} href="/">Договір публічної оферти</a></li>
              <li><a className={styles.text} href="/">Обмін повернення</a></li>
              <li><a className={styles.text} href="/">Політика конфіденційності</a></li>
              <li><a className={styles.text} href="/">Угода користувача</a></li>
            </ul>

            <div className={styles.container_img}>
              <Image 
                src={bank}
                alt="icon"
                priority={true}
                loading="eager"
                style={{ marginTop: "30px", marginBottom: "20px" }}
                quality={100}
              />
            </div>
          </div>
        {/* form */}
          <div >
          <p className={styles.description}>Дізнавайтесь першими про новинки, знижки, акції та новини!</p>
            <form action="" className={styles.form}>
              <input type="text" className={styles.input} placeholder="Ваше ім’я" />
              <input type="text" className={styles.input} placeholder="Ваш email" />
              <button className={styles.btn}>підписатися</button>
            </form>
          </div>
      </div>
    </section>
  )
}
