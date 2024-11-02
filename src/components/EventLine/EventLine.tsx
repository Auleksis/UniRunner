import s from "./EventLine.module.css";
import Calendar from "/src/assets/icons/calendar.svg?react";
import Arrow from "/src/assets/icons/arrow.svg?react";
import EventTemplate from "/src/assets/images/event_template.jpg";
import { Link as RRDLink } from "react-router-dom";

export interface EventLineProps {
  date: string;
  name: string;
  description: string;
  eventID: string;
  image: string | React.ReactNode;
  url?: string;
}

const EventLine: React.FunctionComponent<EventLineProps> = ({
  date,
  name,
  description,
  eventID,
  image,
  url,
}) => {
  const getImage = () => {
    if (!image) {
      return <img src={EventTemplate} className={s.event_line_image} />;
    }
    if (typeof image == "string") {
      return <img src={image} className={s.event_line_image} />;
    } else {
      return image;
    }
  };
  return (
    <div className={s.event_line_container}>
      {getImage()}
      <div className={s.event_line_description_container}>
        <Calendar className={s.event_line_description_calendar_svg} />
        <div className={s.event_line_description_text_container}>
          <p className={s.small_text}>{name}</p>
          <p className={s.subtext}>{description}</p>
        </div>
        <div className={s.event_line_more_container}>
          <RRDLink
            className={s.event_line_more_button}
            // to={`/events/${eventID}`}
            to={url ?? "#"}
            // target="_blank"
          >
            <p className={s.small_text}>Подробнее</p>
            <Arrow className={s.event_line_more_button_arrow} />
          </RRDLink>
          <div className={s.event_line_more_date}>
            <p className={s.default_text}>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLine;
