import s from "./EventPage.module.css";

const EventPage = () => {
  return (
    <div className={s.no_event_div}>
      <p className={s.default_text}>
        Похоже, пока не нашлось ни одного мероприятия...
      </p>
    </div>
  );
};

export default EventPage;
