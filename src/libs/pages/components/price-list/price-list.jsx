"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import styles from './price-list.module.scss';
import Filter from '@/libs/modal/filter/filter';

import PartnersIcon from '@/shared/icons/partners';
import { slugify } from 'transliteration';

export default function PriceList({ data, dollar }) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isData, setIsData] = useState([]);
  const [isFilters, setIsFilters] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const [isScroll, setIsScroll] = useState(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const path = usePathname().replace("/", ""); 

  useEffect(() => {
    setIsClient(true);
  }, [])

  useEffect(() => {
    if (isOpenFilter) {
      setIsScroll(window.scrollY);

      document.body.style.overflow = "hidden";
      document.body.style.maxHeight = "100vh";
    }

    window.scrollTo(0, isScroll);

    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.maxHeight = "";
    };
  }, [isOpenFilter]);

  useEffect(() => {
    const updatedData = data.map(item => {
      const ukrainianName = item.attributes.title;
      const name = slugify(ukrainianName);
      
      return {
        ...item,
        attributes: {
          ...item.attributes,
          link: name
        }
      };
    });
    setIsData(updatedData.sort((a, b) => a.attributes.price - b.attributes.price));
    setIsFilters(updatedData.sort((a, b) => a.attributes.price - b.attributes.price));
  }, []);

  return (
    <>
      <section className={styles.section} style={{ background: "#FAF7F1" }}>
        <div className={styles.container}>
          <button className={styles.btn} onClick={() => setIsOpenFilter(true)}>
            ФІЛЬТРИ
          </button>

          <ul className={styles.card_container}>
            {isFilters.map((item, id) => {
              const ukrainianName = item.attributes.link;
              const oldPrice = Math.floor(isFilters[id].attributes.oldPrice * dollar);

              return (
                <li key={id} className={styles.content}>
                  <Link className={styles.link} href={`/${path}/${ukrainianName}`}>
                    <div className={styles.partners_icon}>
                      <PartnersIcon data={data} name={item.attributes.title} />
                    </div>
                    <div className={styles.img_container}>
                      <Image
                        src={`https://www.admin-enfys.space${item.attributes.gallery.data[0].attributes.url}`}
                        alt="image"
                        priority={true}
                        loading="eager"
                        fill
                        sizes='100%'
                        quality={100}
                        className={styles.img}
                        // style={{mixBlendMode: "multiply"}}
                      />
                    </div>
                    <h2 className={styles.title}>{item.attributes.title}</h2>
                    <div className={styles.price_container}>
                      {isFilters[id].attributes.inStock === "в наявності"
                        ?
                        <p className={styles.price}>
                          {Math.floor(isFilters[id].attributes.price * dollar)} ГРИВЕНЬ
                          <span className={styles.old_price}>{oldPrice > 0 ? oldPrice + 'ГРИВЕНЬ' : ""}</span>
                        </p>
                        :
                        isFilters[id].attributes.inStock === "очікуємо" ?
                          <p className={styles.price}>{isFilters[id].attributes.inStock}</p>
                          :
                          <p className={styles.price}>{isFilters[id].attributes.inStock}</p>
                      }
                    </div>
                  <button className={styles.btn_card}>купити</button>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      {isClient &&
        <motion.div
          animate={{ zIndex: isOpenFilter ? "100" : "-1" }}
          transition={{ duration: 5 }}
        >
          <Filter setIsOpenFilter={setIsOpenFilter} isOpenFilter={isOpenFilter} isData={isData} dollar={dollar} isFilters={isFilters} setIsFilters={setIsFilters} />
        </motion.div>
      }
    </>
  );
}
