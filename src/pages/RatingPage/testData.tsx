export interface User {
  name: string;
  family_name: string;
  given_name: string;
  email: string;
  gender: string;
  date_of_birth: string;
  university_id: string;
  id: string;
  total_kilometers: number;
  total_activities: number;
}

export const users: Array<User> = [
  {
    name: "t1",
    family_name: "Чернышев",
    given_name: "Владислав",
    email: "random1.email@mail.ru",
    gender: "Мужской",
    date_of_birth: "20.02.2002",
    university_id: "1",
    id: "1",
    total_kilometers: 2,
    total_activities: 1,
  },
  {
    name: "t2",
    family_name: "Чернышев",
    given_name: "Иван",
    email: "random2.email@mail.ru",
    gender: "Мужской",
    date_of_birth: "10.04.2000",
    university_id: "1",
    id: "2",
    total_kilometers: 15,
    total_activities: 2,
  },
  {
    name: "t3",
    family_name: "Иванов",
    given_name: "Дмитрий",
    email: "random3.email@mail.ru",
    gender: "Мужской",
    date_of_birth: "11.05.2001",
    university_id: "2",
    id: "3",
    total_kilometers: 1,
    total_activities: 5,
  },
  {
    name: "t4",
    family_name: "Фирсов",
    given_name: "Николай",
    email: "random4.email@mail.ru",
    gender: "Мужской",
    date_of_birth: "21.05.2001",
    university_id: "2",
    id: "4",
    total_kilometers: 17,
    total_activities: 2,
  },
  {
    name: "t5",
    family_name: "Райкин",
    given_name: "Станислав",
    email: "random5.email@mail.ru",
    gender: "Мужской",
    date_of_birth: "19.07.2001",
    university_id: "3",
    id: "5",
    total_kilometers: 1.5,
    total_activities: 1,
  },
  {
    name: "t6",
    family_name: "Филина",
    given_name: "Екатерина",
    email: "random6.email@mail.ru",
    gender: "Женский",
    date_of_birth: "19.07.2001",
    university_id: "4",
    id: "6",
    total_kilometers: 4,
    total_activities: 3,
  },
  {
    name: "t7",
    family_name: "Орехова",
    given_name: "Мария",
    email: "random7.email@mail.ru",
    gender: "Женский",
    date_of_birth: "28.10.2002",
    university_id: "4",
    id: "7",
    total_kilometers: 5,
    total_activities: 3,
  },
];
