'use client'
import styles from './content.text.module.scss';

const Content = ({ text }) => {
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ul>
          {text.map((item, id) => (
            <li key={id}>
              <h3 className={styles.item}>{item.title}</h3>
              <ul className={styles.list}>
                {item.description.map(({ text }, id) => (
                  <li key={id} className={styles.item}>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
            </li>
            ))}
        </ul>
        
      </div>
    </section>
  );
};

export { Content };
