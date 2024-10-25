import s from "./NewsLine.module.css";
import Calendar from "/src/assets/icons/calendar.svg?react";
import Arrow from "/src/assets/icons/arrow.svg?react";
import EventTemplate from "/src/assets/images/event_template.jpg";
import { Link as RRDLink } from "react-router-dom";

export interface NewsLineProps {
  date: string;
  name: string;
  shortDescription?: string;
  eventID: string;
  image: string | React.ReactNode;
}

const NewsLine: React.FunctionComponent<NewsLineProps> = ({
  date,
  name,
  shortDescription,
  eventID,
  image,
}) => {
  const getImage = () => {
    if (!image) {
      return <img src={EventTemplate} className={s.news_line_image} />;
    }
    if (typeof image == "string") {
      return <img src={image} className={s.news_line_image} />;
    } else {
      return image;
    }
  };
  return (
    <div className={s.news_line_container}>
      {getImage()}
      <div className={s.news_line_description_container}>
        <Calendar className={s.news_line_description_calendar_svg} />
        <div className={s.news_line_description_text_container}>
          <p className={s.small_text}>{name}</p>
          <p className={s.subtext}>{shortDescription}</p>
        </div>
        <div className={s.news_line_more_container}>
          <RRDLink
            className={s.news_line_more_button}
            to={`/events/${eventID}`}
          >
            <p className={s.small_text}>Подробнее</p>
            <Arrow className={s.news_line_more_button_arrow} />
          </RRDLink>
          <div className={s.news_line_more_date}>
            <p className={s.default_text}>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLine;
