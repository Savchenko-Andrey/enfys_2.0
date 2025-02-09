'use client'
import Image from "next/image";
import cornerRightGreen from '@/assets/svg/corner-right-green.svg';
import cornerLeftGreen from '@/assets/svg/corner-left-green.svg';

import styles from './about.module.scss'

export default function About() {
  return (
    <section className={styles.section}>
      <div className={styles.corner_left}>
          <Image
            src={cornerLeftGreen}
            alt="cornerLeft"
            priority={true}
            loading="eager"
          />
        </div>
        <div className={styles.corner_right}>
          <Image
            src={cornerRightGreen}
            alt="cornerRight"
            priority={true}
            loading="eager"
          />
        </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Enfys.com.ua – найнеобхідніші дитячі товари</h2>
        <div className={styles.container_text}>
          <p className={styles.text}>{"Народження малюка – радісна подія. Але вона пов'язана з безліччю турбот, які в основному полягають в необхідності закупити велику кількість речей для догляду за новонародженим."}</p>
          <p className={styles.text}>{"У цьому головна складність – окремі категорії товарів для наймолодших продаються в різних магазинах: дитячий транспорт – в одному, іграшки – в іншому. Просто неможливо обійти їх всі, особливо якщо майбутня мама перебуває на останніх місяцях вагітності, а тато зайнятий роботою."}</p>
          <p className={styles.text}>{"Але вихід є – вигідний і швидкий шопінг в нашому інтернет-магазині Enfys Babyshop. Вам не потрібно буде витрачати час на відвідування десятків різних торгових точок, адже тут зібрано все найнеобхідніше."}</p>
        </div>

        <button className={styles.btn}>ПРО МАГАЗИН</button>
      </div>
    </section>
  )}