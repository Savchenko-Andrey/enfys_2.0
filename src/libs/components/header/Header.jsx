"use client"
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { useState, useEffect } from "react";
import styles from "./Header.module.scss";

import Menu from "@/libs/components/menu/menu";
import Pay from "@/libs/modal/modal-pay/modal-pay";
import { usePathname } from "next/navigation";


export default function Header() {
  const [isMenu, setIsMenu] = useState(false);
  const [isSocial, setIsSocial] = useState(false);
  const [storedItems, setStoredItems] = useState([]);
  const [isPay, setIsPay] = useState(false);

  const path = usePathname();

  const [isScroll, setIsScroll] = useState(
  typeof window !== "undefined" ? window.scrollY : 0
  );

  const openMenu = () => {
    setIsMenu(!isMenu)
  }


  useEffect(() => { 
    const existingData = JSON.parse(localStorage.getItem("storedItems")) || [];
    setStoredItems(existingData);
  },[])


  useEffect(() => {
    if (isMenu) {
      setIsScroll(window.scrollY);

      document.body.style.overflow = "hidden";
      document.body.style.maxHeight = "100vh";
    }
    else if (isPay) {
      document.body.style.overflow = "hidden";
      document.body.style.maxHeight = "100vh";
    }
    
    window.scrollTo(0, isScroll);

    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.maxHeight = "";
    };
  }, [isMenu, isPay]);

  const openSocial = () => {
    setIsSocial(!isSocial)
  }

  return (
    <>
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.btn} onClick={openMenu}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div> 
        <Link href="/" className={styles.home}></Link>
        <div style={{display: "none"}}>
          <Menu setIsMenu={ setIsMenu } />
        </div>
        <AnimatePresence>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Menu setIsMenu={setIsMenu} setIsPay={setIsPay} />
            </motion.div>
          )}
        </AnimatePresence>
        </div>
        {!isMenu &&
          <div className={`${styles.icon_whatsapp} ${isSocial ? "" : styles.animation}`} onClick={openSocial}>
            {!isSocial ?
              // open icon
              <svg xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24">
                <path fill="none"
                  stroke={path === "/" ? "currentColor" : " #ffa034a1"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12.5 3.004a33 33 0 0 0-2.67.067c-4.184.278-7.516 3.657-7.79 7.9a20 20 0 0 0 0 2.52c.1 1.545.783 2.976 1.588 4.184c.467.845.159 1.9-.328 2.823c-.35.665-.526.997-.385 1.237c.14.24.455.248 1.084.263c1.245.03 2.084-.322 2.75-.813c.377-.279.566-.418.696-.434s.387.09.899.3c.46.19.995.307 1.485.34c1.425.094 2.914.094 4.342 0c4.183-.278 7.515-3.658 7.789-7.9c.042-.655.051-1.328.027-1.991M8.5 15h7m-7-5H12m3-4.5h7M18.5 2v7"
                  color="currentColor" />
              </svg>
              // close icon
              :
              <svg role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                width="50" height="50"
                viewBox="0 0 23 23">
                <g fillRule="evenodd">
                  <path d="M10.314 -3.686H12.314V26.314H10.314z" transform="rotate(-45 11.314 11.314)"></path>
                  <path d="M10.314 -3.686H12.314V26.314H10.314z" transform="rotate(45 11.314 11.314)"></path>
                </g>
              </svg>}
          </div>}
        
        {isSocial &&
          <div className={styles.social_cantainer}>
            <Link target="_blank" href="/">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 256">
                  <defs>
                    <linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#2AABEE" />
                      <stop offset="100%" stopColor="#229ED9" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z" />
                  <path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z" /></svg>
              </div>
            </Link>
            <Link target="_blank" href="/">
              <div>
                <svg width="50" height="50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 50a25 25 0 100-50 25 25 0 000 50z" fill="#fff"></path>
                  <path d="M26.1 12a12.1 12.1 0 00-10.25 18.53l.29.46-1.22 4.46 4.57-1.2.45.27a12.1 12.1 0 106.16-22.51V12zm6.79 17.22c-.3.85-1.72 1.62-2.41 1.72-.62.1-1.4.14-2.25-.14-.7-.22-1.37-.47-2.03-.77-3.59-1.57-5.93-5.24-6.1-5.48-.19-.24-1.47-1.97-1.47-3.76 0-1.79.93-2.67 1.25-3.03.33-.37.72-.46.96-.46.23 0 .47 0 .68.02.22 0 .52-.09.8.62l1.1 2.7c.1.18.16.4.04.64s-.18.39-.36.6c-.18.21-.38.47-.54.64-.18.18-.36.38-.15.74.2.36.92 1.55 1.98 2.52 1.37 1.23 2.52 1.62 2.88 1.8.35.18.56.15.77-.1.2-.23.9-1.05 1.13-1.42.24-.36.48-.3.8-.18.33.12 2.09 1 2.44 1.18.36.19.6.28.69.43.09.15.09.88-.21 1.73z" fill="#27D061"></path>
                  <path d="M25 0a25 25 0 100 50 25 25 0 000-50zm1.03 38.37c-2.42 0-4.8-.6-6.9-1.76l-7.67 2 2.05-7.45a14.3 14.3 0 01-1.93-7.2c0-7.92 6.49-14.38 14.45-14.38a14.4 14.4 0 110 28.79z" fill="#27D061"></path></svg>
              </div>
            </Link>
          </div>
        }
      </section>
      {isPay &&
        <Pay
          setIsPay={setIsPay}
          storedItems={storedItems}
          setStoredItems={setStoredItems}
          setIsMenu={setIsMenu}
        />
      }
      </>
  );
}
