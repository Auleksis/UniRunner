import s from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div>
      <h1 className={s.title}>PRIVATE PAGE!</h1>
      <p className={s.default_text}>Stay away! This is a private page!</p>
    </div>
  );
};

export default AboutPage;
