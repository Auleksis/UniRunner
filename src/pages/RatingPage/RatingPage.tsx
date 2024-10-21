import { useEffect, useState } from "react";
import RatingLine from "../../components/RatingLine/RatingLine";
import s from "./RatingPage.module.css";
import Select from "../../components/Select/Select";
import RadioButtonGroup from "../../components/RadioButton/RadioButtonGroup";
import useList from "../../components/RadioButton/useList";
import SearchLine from "../../components/SearchLine/SearchLine";
import { User } from "../../features/user/User";
import { getUniversities, getUsers } from "../../services/api";
import Button from "../../components/Button/Button";
import { University } from "../../models/University";

const RatingsPage = () => {
  //list of all users
  const [users, setUsers] = useState<Array<User>>([]);

  //list of all SSKs
  const [universities, setUniversities] = useState<Array<University>>([]);

  //loading flags
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadingUvinersities, setLoadingUniversities] =
    useState<boolean>(false);

  const [maxUserDistance, setMaxUserDistance] = useState<number>(0);

  const [maxUniversityDistance, setMaxUniversityDistance] = useState<number>(0);

  //0 = sort by distance, 1 = sort by count of activities
  const [sortMode, setSortMode] = useState<number>(0);

  //0 = show all genders, 1 = show men, 2 = show women
  const [genderMode, setGenderMode] = useState<number>(0);

  //handle sort mode changed
  const [sortModeChanged, setSortModeChanged] = useState<boolean>(false);

  //handle gender mode changed
  const [genderModeChanged, setGenderModeChanged] = useState<boolean>(false);

  //if show all users with filters
  const [showedUsers, setShowedUsers] = useState<Array<User>>([]);

  //if show all universities with filters
  const [showedUniversities, setShowedUniversities] = useState<
    Array<University>
  >([]);

  //if use searching
  const [isSearching, setSearching] = useState<boolean>(false);
  const [foundUsers, setFoundUsers] = useState<Array<User>>([]);
  const [foundUniversities, setFoundUniversities] = useState<Array<University>>(
    []
  );

  const ratingTypes = ["Спортивные клубы", "Студенты"];
  //0 = show sport clubs, 1 = show students (users)
  const [selectedRatingType, onRatingTypeSelect] = useList(ratingTypes);

  const sortOptions = ["Расстоянию", "Активностям"];

  const genderOptions = ["Всех", "Юношей", "Девушек"];

  //List view settings
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [fetchCount, setFetchCount] = useState<number>(100000);
  const [pageCount, setPageCount] = useState<number>(10);

  const onRatingTypeSelected = (index: number) => {
    onRatingTypeSelect(index);
    setPage(0);

    if (index == 0) {
      setMaxPage(Math.ceil(universities.length / pageCount));
    } else {
      setMaxPage(Math.ceil(users.length / pageCount));
    }
  };

  const filterUsers = (user: User) => {
    return (
      genderMode == 0 ||
      (user.gender == "Мужской" && genderMode == 1) ||
      (user.gender == "Женский" && genderMode == 2)
    );
  };

  useEffect(() => {
    setLoadingUsers(true);
    setLoadingUniversities(true);

    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(0, fetchCount);

      fetchedUsers.sort((u1, u2) => {
        return u2.total_distance - u1.total_distance;
      });

      setMaxUserDistance(fetchedUsers[0].total_distance);

      let fetchedShowedUsers = fetchedUsers.slice(
        page * pageCount,
        (page + 1) * pageCount
      );

      setUsers(fetchedUsers);

      setShowedUsers(fetchedShowedUsers);

      setLoadingUsers(false);
    };

    fetchUsers();

    const fetchSSKs = async () => {
      const fetchedUniversities = await getUniversities(0, fetchCount);

      fetchedUniversities.sort((u1, u2) => {
        return u2.total_distance - u1.total_distance;
      });
      setMaxUniversityDistance(fetchedUniversities[0].total_distance);

      let fetchedShowedUniversities = fetchedUniversities.slice(
        page * pageCount,
        (page + 1) * pageCount
      );

      setUniversities(fetchedUniversities);

      setShowedUniversities(fetchedShowedUniversities);

      setLoadingUniversities(false);

      setMaxPage(Math.ceil(fetchedUniversities.length / pageCount));
    };

    fetchSSKs();
  }, []);

  useEffect(() => {
    console.log("RELOADED");
    if (selectedRatingType == "Студенты") {
      let userList: Array<User> = isSearching ? foundUsers : users;

      if (sortModeChanged) {
        userList.sort((u1, u2) => {
          return sortMode == 0
            ? u2.total_distance - u1.total_distance
            : u2.total_activities - u1.total_activities;
        });

        setSortModeChanged(false);
      }

      setMaxPage(Math.ceil(userList.length / pageCount));

      userList = userList.slice(page * pageCount, (page + 1) * pageCount);

      if (genderModeChanged) {
        userList = userList.filter(filterUsers);
        setGenderModeChanged(false);
      }

      setShowedUsers(userList.filter(filterUsers));
    } else {
      let universitiesList: Array<University> = isSearching
        ? foundUniversities
        : universities;

      if (sortModeChanged) {
        universitiesList.sort((u1, u2) => {
          return sortMode == 0
            ? u2.total_distance - u1.total_distance
            : u2.total_activities - u1.total_activities;
        });

        setSortModeChanged(false);
      }

      setMaxPage(Math.ceil(universitiesList.length / pageCount));

      universitiesList = universitiesList.slice(
        page * pageCount,
        (page + 1) * pageCount
      );

      setShowedUniversities(universitiesList);
    }
  }, [sortMode, genderMode, isSearching, foundUsers, page]);

  const onSortSelect = (index: number) => {
    setSortMode(index);
    setSortModeChanged(true);
    setPage(0);
  };

  const onGenderSelect = (index: number) => {
    setGenderMode(index);
    setGenderModeChanged(true);
    setPage(0);
  };

  const onUsersSearchComplete = (objList: Array<User>) => {
    if (objList.length > 0) {
      onGenderSelect(0);
      setFoundUsers(objList);
      setSearching(true);
      setPage(0);
    } else {
      setSearching(false);
    }
  };

  const onUniversitySearchComplete = (objList: Array<University>) => {
    if (objList.length > 0) {
      setFoundUniversities(objList);
      setSearching(true);
      setPage(0);
    } else {
      setSearching(false);
    }
  };

  const userSearchHandler = (user: User) => {
    return (
      user.lastName +
      " " +
      user.firstName +
      "\nСпортивный клуб: " +
      user.university
    );
  };

  const universitySearchHandle = (university: University) => {
    return (
      university.ssk_name +
      "\nУниверситет: " +
      university.full_organization_name
    );
  };

  const userSearchElement = (user: User) => {
    return (
      <div className={s.rating_student_search_element}>
        <p className={s.invert_default_text}>
          {user.lastName + " " + user.firstName}
        </p>
        <p
          className={s.invert_subtext}
        >{`Спортивный клуб: ${user.university}`}</p>
        <hr className={s.hr_horizontal} style={{ height: "3px" }} />
      </div>
    );
  };

  const universitySearchElement = (university: University) => {
    return (
      <div className={s.rating_student_search_element}>
        <p className={s.invert_default_text}>{university.ssk_name}</p>
        <p
          className={s.invert_subtext}
        >{`Университет: ${university.full_organization_name}`}</p>
        <hr className={s.hr_horizontal} style={{ height: "3px" }} />
      </div>
    );
  };

  const returnAllMatchingResultsButton = () => {
    return (
      <div className={s.rating_student_search_element}>
        <p className={s.invert_default_text}>Показать все результаты</p>
        <hr className={s.hr_horizontal} style={{ height: "3px" }} />
      </div>
    );
  };

  const handlePageNext = () => {
    if (page < maxPage - 1) {
      setPage(page + 1);
    }
  };

  const handlePagePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className={s.rating_page_intro_div}>
        <div className={s.page_intro_title_div}>
          <h1 className={s.default_text}>Рейтинги</h1>
        </div>
        <p className={s.default_text}>Выберите рейтинг</p>
      </div>
      <hr className={s.hr_horizontal} />
      <div className={s.rating_type_and_search}>
        <RadioButtonGroup
          className={s.rating_type_container}
          options={ratingTypes}
          onSelected={onRatingTypeSelected}
          selected={selectedRatingType}
        />
        {selectedRatingType == "Студенты" && (
          <SearchLine
            objectsArray={users}
            objectToNodeConverter={userSearchElement}
            objectHandler={userSearchHandler}
            onSearchComplete={onUsersSearchComplete}
            placeholder={"Начните вводить ФИО студента или название СК"}
            onReturnAllMatchingResultsButton={returnAllMatchingResultsButton}
          />
        )}
        {selectedRatingType == "Спортивные клубы" && (
          <SearchLine
            objectsArray={universities}
            objectToNodeConverter={universitySearchElement}
            objectHandler={universitySearchHandle}
            onSearchComplete={onUniversitySearchComplete}
            placeholder={"Начните вводить название СК"}
            onReturnAllMatchingResultsButton={returnAllMatchingResultsButton}
          />
        )}
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
      <div className={s.page_switch_div}>
        <Button text="Назад" onClick={handlePagePrev} />
        <p className={s.default_text}>Страница {page + 1}</p>
        <Button text="Вперёд" onClick={handlePageNext} />
      </div>
      <hr className={s.hr_horizontal} />
      {selectedRatingType === "Студенты" &&
        showedUsers.map((user, index) => (
          <div className={s.ratings_container} key={index}>
            <RatingLine
              name={user.lastName + " " + user.firstName}
              index={index + 1 + page * pageCount}
              activities={user.total_activities}
              distance={user.total_distance}
              max_distance={maxUserDistance}
            />
          </div>
        ))}
      {selectedRatingType === "Спортивные клубы" &&
        showedUniversities.map((university, index) => (
          <div className={s.ratings_container} key={index}>
            <RatingLine
              name={university.ssk_name}
              index={index + 1 + page * pageCount}
              activities={university.total_activities}
              distance={university.total_distance}
              max_distance={maxUniversityDistance}
            />
          </div>
        ))}
      <hr className={s.hr_horizontal} />
      <div className={s.page_switch_div}>
        <Button text="Назад" onClick={handlePagePrev} />
        <p className={s.default_text}>Страница {page + 1}</p>
        <Button text="Вперёд" onClick={handlePageNext} />
      </div>
    </div>
  );
};

export default RatingsPage;
