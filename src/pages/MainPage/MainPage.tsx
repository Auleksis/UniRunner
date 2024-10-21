import { useEffect, useState } from "react";
import s from "./MainPage.module.css";
import { getUniversities } from "../../services/api";
import BriefRatingLine from "../../components/BriefRatingLine/BriefRatingLine";
import NewsCard from "../../components/NewsCard/NewsCard";

const MainPage = () => {
  const [rating, setRating] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      const data = await getUniversities(0, 5);

      const universities: Array<string> = [];
      data.forEach((u) => universities.push(u.ssk_name));

      setRating(universities);
    };

    fetchUniversities();
  }, []);

  return (
    <div className={s.top_table_div}>
      <div className={s.main_page_title_div}>
        <p className={s.mega_logo_title}>UNIRUNNER</p>
        <p className={s.default_text}>
          "Чудо не в том, что я финишировал. Чудо в том, что у меня хватило
          смелости начать..."
        </p>
        <p className={s.default_text} style={{ textAlign: "right" }}>
          Джон Бингем
        </p>
      </div>
      <div className={s.main_page_rating_div}>
        <div className={s.main_page_rating_title_div}>
          <div className={s.main_page_rating_title_top}>
            <p className={s.invert_subtitle}>ТОП-5</p>
          </div>
          <div className={s.main_page_rating_title}>
            <p className={s.invert_subtitle}>ВУЗов</p>
          </div>
        </div>
        {rating.map((text, index) => (
          <BriefRatingLine index={index + 1} text={text} key={index} />
        ))}
      </div>
      <div className={s.main_page_news_div}>
        <div className={s.main_page_news_title}>
          <p className={s.accent_subtitle}>Новости</p>
        </div>
        <div className={s.main_page_news_cards}>
          <NewsCard
            title="Релиз платформы!"
            text="Рады приветствовать вас на платформе для беговых клубов!"
          />

          <NewsCard
            title="Поддержите свой ВУЗ!"
            text="Регистрируйтесь на платформе, чтобы вывести свой ВУЗ на первую строчку рейтинга."
          />
          <NewsCard
            title="Следите за новостями!"
            text="Скоро здесь что-нибудь появится"
          />
        </div>
      </div>
      <div className={s.main_page_announcements_div}>
        <div className={s.main_page_announcements_title}>
          <p className={s.accent_subtitle}>Анонсы</p>
        </div>
        <div className={s.main_page_announcements_cards}>
          <NewsCard
            title="Новые мероприятия совсем скоро!"
            text="Вскоре мы опубликуем на платформе информацию о мероприятиях, на которое вы сможете зарегистрироваться."
          />
          <NewsCard
            title="Следите за новостями!"
            text="Скоро здесь что-нибудь появится"
          />
          <NewsCard
            title="Следите за новостями!"
            text="Скоро здесь что-нибудь появится"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
