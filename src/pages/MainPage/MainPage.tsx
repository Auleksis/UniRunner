import { useEffect, useState } from "react";
import s from "./MainPage.module.css";
import { getUniversities } from "../../services/api";
import BriefRatingLine from "../../components/BriefRatingLine/BriefRatingLine";
import events from "../../components/NewsLine/ExampleData";
import NewsLine from "../../components/NewsLine/NewsLine";
import EventLine from "../../components/EventLine/EventLine";

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
          <p className={s.accent_subtitle}>События</p>
        </div>
        <div className={s.main_page_news_lines}>
          {events.map((value, index) => (
            <EventLine
              date={value.date}
              eventID={value.id}
              image={value.image}
              name={value.name}
              description={value.shortDescription}
              key={index}
              url={value.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
