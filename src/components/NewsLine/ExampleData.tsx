import { Event } from "../../models/Event";
import EveningImage from "/src/assets/events/evening.jpg";
import MorningImage from "/src/assets/events/morning.jpg";

let events: Array<Event> = [
  {
    id: "1",
    name: "Зимний марафон «Дорога Жизни»",
    date: "26.01.2025",
    fullDescription: "",
    shortDescription: "",
    image: undefined,
    href: "https://heroleague.ru/doroga",
  },
  {
    id: "2",
    name: "Утренняя беговая экскурсия по центру Петербурга «Дворцовая пятерка» 25 января",
    date: "25.01.2025",
    fullDescription: "",
    shortDescription: "",
    image: undefined,
    href: "https://reg.russiarunning.com/event/UtrennyayabegovayaekskursiyapotsentruPeterburgaDvortsovayapyaterka25yanvarya",
  },
  {
    id: "3",
    name: 'Всероссийская акция "Зачетный СТУДзаБЕГ"',
    date: "25.01.2025",
    fullDescription: "",
    shortDescription: "",
    image: undefined,
    href: "https://studathletics.org/events/studzabeg_akciya_2025",
  },
  {
    id: "4",
    name: "Екатерингоф | GoodTrail",
    date: "01.02.2025",
    fullDescription: "",
    shortDescription: "",
    image: undefined,
    href: "https://reg.russiarunning.com/event/ekaterinhof",
  },
  {
    id: "5",
    name: "Зимний Павловский забег 2025",
    date: "23.02.2025",
    fullDescription: "",
    shortDescription: "",
    image: undefined,
    href: "https://reg.russiarunning.com/event/ZimniyPavlovskiyzabeg2025?scrollToTop=1",
  },
  {
    id: "6",
    name: "VII Весенний МарафонЪ 8 марта (Орден Св.Анны)",
    date: "08.03.2025",
    fullDescription: "",
    shortDescription: "",
    image: undefined,
    href: "https://reg.russiarunning.com/event/OrdenaRussiaStAnna",
  },
  {
    id: "7",
    name: "На Вираже",
    date: "08.03.2025",
    fullDescription: "",
    shortDescription: "",
    image: undefined,
    href: "https://reg.russiarunning.com/event/NaVirazhe2025?scrollToTop=1",
  },
  {
    id: "8",
    name: "Арена Полумарафон 2025",
    date: "13.04.2025",
    fullDescription: "",
    shortDescription: "",
    image: undefined,
    href: "https://reg.russiarunning.com/event/ArenaPolumarafon2025",
  },
];

events = events.sort((value1, value2) => {
  const data1_str: string[] = value1.date.split(".", 3);
  const data1: [number, number, number] = [
    Number(data1_str[2]),
    Number(data1_str[1]),
    Number(data1_str[0]),
  ];
  const data2_str: string[] = value2.date.split(".", 3);
  const data2: [number, number, number] = [
    Number(data2_str[2]),
    Number(data2_str[1]),
    Number(data2_str[0]),
  ];

  const diff = new Date(...data1).getTime() - new Date(...data2).getTime();

  return diff;
});

export default events;
