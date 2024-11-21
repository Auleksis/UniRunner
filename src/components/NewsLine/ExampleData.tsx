import { Event } from "../../models/Event";
import ArenaImage from "/src/assets/events/arena.jpg";
import GogolImage from "/src/assets/events/gogol.jpg";
import ElaginImage from "/src/assets/events/elagin.jpg";

let events: Array<Event> = [
  {
    id: "1",
    name: "Ночная беговая экскурсия по центру Петербурга",
    date: "29.11.2024",
    fullDescription:
      "Пусть уже и не белые, но все-таки настоящие петербургские ночи! Что может быть лучше, чем пробежаться по набережным, улицам и проспектам ночной Северной столицы? Присоединяйтесь к беговой экскурсии.",
    shortDescription: "",
    image: undefined,
    href: "https://russiarunning.com/event/NochnayabegovayaekskursiyapotsentruPeterburga29noyabrya/",
  },
  {
    id: "2",
    name: "Утренняя беговая экскурсия по центру Петербурга",
    date: "01.12.2024",
    fullDescription:
      'Наконец-то мы дождались этого события! Появился новый маршрут беговой экскурсии по самому центру Санкт-Петербурга! Многие из вас, наверное, уже были на беговых экскурсиях от автора проекта "Бегущий экскурсовод". Но даже если вы увидели это событие впервые, то приглашаем вас совершить пробежку по самому центру города. Автор проекта - профессиональный экскурсовод, любитель бега и победитель многих конкурсов профессионального мастерства. Во время экскурсии вы узнаете, почему фраза "Не лезь в бутылку" связана с Петербургом, для чего используются пешеходные мосты через некоторые реки и каналы, где находится аптека из стихотворения А.Блока "Ночь, улица, фонарь, аптека", а также много интересного, о чем мы даже не подозреваем, гуляя по городу.',
    shortDescription: "",
    image: undefined,
    href: "https://russiarunning.com/event/UtrennyayabegovayaekskursiyapotsentruPeterburga01dekabrya/",
  },
  {
    id: "3",
    name: "ОТКРЫТЫЙ КУБОК РФСХ IV этап, Новогодний в Санкт-Петербурге",
    date: "15.12.2024",
    fullDescription:
      "Открытый Кубок РФСХ в соревновательной системе северной ходьбы СВ (далее – СХ СВ) является аналогом Кубка России с возможностью привлечения зарубежных спортсменов. Турнир проводится в соответствии с Правилам соревнований по СХ СВ, утвержденными Советом РФСХ 27 сентября 2023 года и Положением об Открытом Кубке РФСХ.",
    shortDescription: "",
    image: undefined,
    href: "https://russiarunning.com/event/4StageCUP2024SPB/",
  },
  {
    id: "4",
    name: 'Новогодний марафон "Sosnovka Snake" (к Году Змеи 2025)',
    date: "15.12.2024",
    fullDescription:
      "Новогодняя сказка в Санкт-Петербурге с восточным колоритом: звездное небо, самый большой лесной массив в центре мегаполиса, тысяча лучших легкоатлетов из разных стран, бегунов и североходцев, среди них и ты! Мы делаем сказку своими руками: волшебство в каждой детали Sosnovka SNAKE марафона!",
    shortDescription: "",
    image: undefined,
    href: "https://russiarunning.com/event/SosnovkaSnake/",
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
