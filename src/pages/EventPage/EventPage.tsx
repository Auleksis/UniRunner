import EventLine from "../../components/EventLine/EventLine";
import events from "../../components/NewsLine/ExampleData";
import s from "./EventPage.module.css";

const EventPage = () => {
  return (
    <div className={s.event_page_div}>
      {events.map((value, index) => (
        <EventLine
          date={value.date}
          eventID={value.id}
          image={value.image}
          name={value.name}
          description={value.fullDescription}
          key={index}
          url={value.href}
        />
      ))}
    </div>
  );
};

export default EventPage;
