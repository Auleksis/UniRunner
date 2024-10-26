import s from "./Footer.module.css";

const Footer = () => {
  const mailto = "mail@kronbars.ru";
  const onFeedbackClicked = () => {
    // window.location.href = mailto;
  };

  return (
    <footer className={s.footer_container}>
      <div className={s.footer_title_div}>
        <p className={s.default_text}>UNIRUNNER 2024</p>
        <p className={s.default_text}>
          Обратная связь:{" "}
          <a
            href={`mailto:${mailto}`}
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
