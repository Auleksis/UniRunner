import s from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div>
      <h1 className={s.title}>Мы верим твёрдо в героев спорта!</h1>
      <p className={s.default_text}>
        На этой платформе мы наконец выясним, какой ВУЗ нашей страны самый
        спортивный. Присоединяйся к спортивному сообществу своего университета и
        выходи на первые строчки рейтинга!
      </p>
    </div>
  );
};

export default MainPage;
