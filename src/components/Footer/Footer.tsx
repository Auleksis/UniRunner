import s from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={s.footer_container}>
      <div className={s.footer_title_div}>
        <p className={s.default_text}>Unirunners</p>
        <p className={s.default_text}>
          Создан при поддержке Минобрнауки России
        </p>
        <p className={s.default_text}>
          Вопросы и предложения{" "}
          <a href={`https://t.me/unirunners`} target="_blank">
            @unirunners
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
