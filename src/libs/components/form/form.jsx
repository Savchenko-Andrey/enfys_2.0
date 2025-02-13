import { useState } from 'react';
import styles from './form.module.scss'

export default function ContactForm({setIsThenkyou}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    email: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Отправка данных формы
    // console.log(formData);
    setIsThenkyou(true);
    setFormData({
      name: '',
      phone: '',
      subject: '',
      email: '',
      agree: false,
    })
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form_container}>
      <div className={styles.container_input}>
        <input
          className={styles.input}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder='Ім’я'
        />
        <input
          className={styles.input}
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder='Телефон'
          />
      
        <input
          className={`${styles.input}`}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='Email'
        />
        
      </div>
      <div>
      <textarea
          className={`${styles.input} ${styles.input_desc} ${styles.taxtarea}`}
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder='Тема повідомлення'
        />
        </div>
      </div>
        
      <div className={styles.chack}>
        <label htmlFor="agree" className={styles.text_chack}>
          Я прочитав/ла та погоджуюся з Політикою конфедиційності.
        </label>
        <input
          className={styles.cb_custom}
          type="checkbox"
          id="agree"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          required
        />
        </div>
      <button type="submit" className={styles.btn} onClick={handleSubmit}>Відправити</button>
    </form>
  );
}
