import { useParams } from "react-router-dom";
import s from "./EventShowPage.module.css";
import { useEffect, useState } from "react";
import { Event } from "../../models/Event";
import events from "../../components/NewsLine/ExampleData";

const EventShowPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    const foundEvent = events.find((value) => {
      return value.id == id;
    });
    setEvent(foundEvent);
  }, [id]);

  return (
    <div className={s.event_show_page_container}>
      <div className={s.event_shopw_page_title_container}>
        <p className={s.logo_title}>{event?.name}</p>
        <a className={s.event_show_page_link} href={event?.href}>
          <p className={s.default_text}>Подробнее</p>
        </a>
      </div>
      <div className={s.event_show_page_details_container}>
        <div className={s.event_show_page_details_line}>
          <p className={s.subtitle}>Дата проведения:</p>
          <p className={s.default_text}>{event?.date}</p>
        </div>
        <div className={s.event_show_page_details_line}>
          <p className={s.subtitle}>Описание:</p>
          <p className={s.default_text}>{event?.fullDescription}</p>
        </div>
      </div>
      {event?.image && typeof event.image == "string" && (
        <div className={s.event_show_page_photo_container}>
          <p className={s.title}>Фото</p>
          <img src={event.image} className={s.event_line_image} />
        </div>
      )}
    </div>
  );
};

export default EventShowPage;
