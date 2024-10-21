import s from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={s.footer_container}>
      <div className={s.footer_title_div}>
        <p className={s.default_text}>UNIRUNNER 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
