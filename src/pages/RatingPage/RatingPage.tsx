import { useEffect, useState } from "react";
import RatingLine from "../../components/RatingLine/RatingLine";
import s from "./RatingPage.module.css";
import Select from "../../components/Select/Select";
import RadioButtonGroup from "../../components/RadioButton/RadioButtonGroup";
import useList from "../../components/RadioButton/useList";
import SearchLine from "../../components/SearchLine/SearchLine";
import { User } from "../../models/User";
import { getUsers } from "../../services/api";

const RatingsPage = () => {
  //list of all users
  const [users, setUsers] = useState<Array<User>>([]);

  const [maxDistance, setMaxDistance] = useState<number>(0);

  //0 = sort by distance, 1 = sort by count of activities
  const [sortMode, setSortMode] = useState<number>(0);

  //0 = show all genders, 1 = show men, 2 = show women
  const [genderMode, setGenderMode] = useState<number>(0);

  //if show all users with filters
  const [showedUsers, setShowedUsers] = useState<Array<User>>([]);

  //if use searching
  const [isSearching, setSearching] = useState<boolean>(false);
  const [foundUsers, setFoundUsers] = useState<Array<User>>([]);

  const ratingTypes = ["Спортивные клубы", "Студенты"];
  //0 = show sport clubs, 1 = show students (users)
  const [selectedRatingType, onRatingTypeSelect] = useList(ratingTypes);

  const sortOptions = ["Расстоянию", "Активностям"];

  const genderOptions = ["Всех", "Юношей", "Девушек"];

  //List view settings
  const [page, setPage] = useState<number>(0);
  const [pageObjectCount, setPageObjectCount] = useState<number>(10000);

  const onRatingTypeSelected = (index: number) => {
    onRatingTypeSelect(index);
  };

  const filter = (user: User) => {
    return (
      genderMode == 0 ||
      (user.gender == "Мужской" && genderMode == 1) ||
      (user.gender == "Женский" && genderMode == 2)
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(
        page * pageObjectCount,
        pageObjectCount
      );

      fetchedUsers.sort((u1, u2) => {
        return u2.total_distance - u1.total_distance;
      });
      setMaxDistance(fetchedUsers[0].total_distance);

      setUsers(fetchedUsers);
      setShowedUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let userList: Array<User> = isSearching ? foundUsers : users;
    userList.sort((u1, u2) => {
      return sortMode == 0
        ? u2.total_distance - u1.total_distance
        : u2.total_activities - u1.total_activities;
    });

    setShowedUsers(userList.filter(filter));
  }, [sortMode, genderMode, isSearching, foundUsers]);

  const onSortSelect = (index: number) => {
    setSortMode(index);
  };

  const onGenderSelect = (index: number) => {
    setGenderMode(index);
  };

  const onUsersSearchComplete = (objList: Array<User>) => {
    if (objList.length > 0) {
      onGenderSelect(0);
      setFoundUsers(objList);
      setSearching(true);
    } else {
      setSearching(false);
    }
  };

  const userSearchHandler = (user: User) => {
    return (
      user.last_name +
      " " +
      user.first_name +
      "\nСпортивный клуб: " +
      user.university
    );
  };

  const userSearchElement = (user: User) => {
    return (
      <div className={s.rating_student_search_element}>
        <p className={s.invert_default_text}>
          {user.last_name + " " + user.first_name}
        </p>
        <p
          className={s.invert_subtext}
        >{`Спортивный клуб: ${user.university}`}</p>
        <hr className={s.hr_horizontal} style={{ height: "3px" }} />
      </div>
    );
  };

  const sportClubSearchHandle = (sc: any) => {
    return "not finished";
  };

  const returnAllMatchingResultsButton = () => {
    return (
      <div className={s.rating_student_search_element}>
        <p className={s.invert_default_text}>Показать все результаты</p>
        <hr className={s.hr_horizontal} style={{ height: "3px" }} />
      </div>
    );
  };

  return (
    <>
      <h1 className={s.title}>Рейтинги</h1>
      <p className={s.default_text}>
        Выберите нужный рейтинг с помощью кнопок снизу.
      </p>
      <hr className={s.hr_horizontal} />
      <div className={s.rating_type_and_search}>
        <RadioButtonGroup
          className={s.rating_type_container}
          options={ratingTypes}
          onSelected={onRatingTypeSelected}
          selected={selectedRatingType}
        />
        <SearchLine
          objectsArray={selectedRatingType == "Спортивные клубы" ? [] : users}
          objectToNodeConverter={userSearchElement}
          objectHandler={
            selectedRatingType == "Спортивные клубы"
              ? sportClubSearchHandle
              : userSearchHandler
          }
          onSearchComplete={onUsersSearchComplete}
          placeholder={
            selectedRatingType == "Спортивные клубы"
              ? "Начните вводить название СК"
              : "Начните вводить ФИО студента или название СК"
          }
          onReturnAllMatchingResultsButton={returnAllMatchingResultsButton}
        />
      </div>
      <hr className={s.hr_horizontal} />
      <div className={s.rating_sort_type_container}>
        <div className={s.rating_select_container}>
          <p className={s.default_text}>Сортировать по</p>
          <Select options={sortOptions} onSelectClicked={onSortSelect} />
        </div>
        <div className={s.rating_select_container}>
          {selectedRatingType === "Студенты" && (
            <>
              <p className={s.default_text}>Показать рейтинг</p>
              <Select
                options={genderOptions}
                onSelectClicked={onGenderSelect}
                indexSelected={genderMode}
              />
            </>
          )}
        </div>
      </div>
      {selectedRatingType === "Студенты" && (
        <div className={s.ratings_container}>
          {showedUsers.map((user, index) => (
            <RatingLine
              name={user.last_name + " " + user.first_name}
              index={index + 1}
              activities={user.total_activities}
              distance={user.total_distance}
              max_distance={maxDistance}
              key={index}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RatingsPage;
