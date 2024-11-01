import s from "./Footer.module.css";

const Footer = () => {
  const mailto = "unirunners";
  const onFeedbackClicked = () => {
    // window.location.href = mailto;
  };

  return (
    <footer className={s.footer_container}>
      <div className={s.footer_title_div}>
        <p className={s.default_text}>Unirunners</p>
        <p className={s.default_text}>
          Обратная связь через телеграм канал:{" "}
          <a
            href={`https://t.me/unirunners`}
            onClick={(e) => {
              onFeedbackClicked();
              e.preventDefault();
            }}
          >
            {mailto}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
