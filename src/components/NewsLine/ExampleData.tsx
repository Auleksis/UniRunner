import { Event } from "../../models/Event";
import ArenaImage from "/src/assets/events/arena.jpg";
import GogolImage from "/src/assets/events/gogol.jpg";
import ElaginImage from "/src/assets/events/elagin.jpg";

let events: Array<Event> = [
  {
    id: "1",
    name: "Крылатский трейл",
    date: "27.10.2024",
    fullDescription:
      "Трейл от организаторов Московского марафона проводится в парке «Крылатские холмы» в Москве и завершает сезон массовых забегов серии «Бегового сообщества». Трасса проходит по осеннему лесу и холмам – отсюда и название забега. На дистанции участников ждут крутые подъёмы и техничные спуски.",
    shortDescription: "",
    image: undefined,
    href: "https://marathonec.ru/krylatsky-trail/",
  },
  {
    id: "2",
    name: "Соревнования в помещении «Скорость»",
    date: "23.11.2024",
    fullDescription:
      "Серия забегов: Соревнования в помещении «Скорость»\nМосква\n23 ноября 2024, 10:00 – 24 ноября 2024\nТип забега: манеж с кругом 200 метров\nДистанции: 3 км, 1 км, 400 м, 200 м, 200 м (этап эстафеты 4х200м), 60 м",
    shortDescription: "",
    image: undefined,
    href: "https://probeg.org/event/56129/",
  },
  {
    id: "3",
    name: "Арена Марафон 2024",
    date: "27.10.2024",
    fullDescription:
      'Первый и единственный забег с финишем по красной дорожке под светом софитов в тёплом и комфортном спорткомплексе "Арена" (бывший СИБУР)!\nДистанции: 42,2 км, 21,1 км, 10 км и 5 км.\nОпытные пейсмейкеры на каждой дистанции и уникальная медаль на финише!\nМаршрут проложен рядом с новейшими знаковыми символами города: "Газпром Арена", "Лахта Центр", ХСД, Яхтенный мост.\nГоловокружительные виды, яркие фото и взрыв эмоций гарантирован!',
    shortDescription: "",
    image: ArenaImage,
    href: "https://russiarunning.com/event/ArenaMarafon2024/?utm_source=get.run&utm_medium=partners&utm_campaign=registration",
  },
  {
    id: "4",
    name: "Гоголь МарафонЪ VII Международный (к 215-летию рождения Н.В.Гоголя)",
    date: "03.11.2024",
    fullDescription:
      "Забег пройдет по дорожкам Удельного парка — объекта культурного наследия Петербурга, где со времён Петра I выращивалась корабельная сосна.",
    shortDescription: "",
    image: GogolImage,
    href: "https://russiarunning.com/event/GogolMarathon/",
  },
  {
    id: "5",
    name: "Закрытие бегового сезона 2024",
    date: "17.11.2024",
    fullDescription:
      "Для участия в забеге необходим медицинский допуск, рекомендуется иметь спортивную страховку.",
    shortDescription: "",
    image: ElaginImage,
    href: "https://reg.o-time.ru/race/24552?utm_source=get.run&utm_medium=partners&utm_campaign=registration",
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
