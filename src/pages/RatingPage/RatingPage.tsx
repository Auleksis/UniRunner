import { useEffect, useRef, useState } from "react";
import RatingLine from "../../components/RatingLine/RatingLine";
import s from "./RatingPage.module.css";
import Select from "../../components/Select/Select";
import RadioButtonGroupProps from "../../components/RadioButton/RadioButtonGroup";
import useList from "../../components/RadioButton/useList";
import SearchLine from "../../components/SearchLine/SearchLine";
import { User } from "../../features/user/User";
import { getLogo, getUniversities, getUsers } from "../../services/api";
import Button from "../../components/Button/Button";
import { University } from "../../models/University";
import Triangle from "/src/assets/icons/triangle.svg?react";
import RadioButtonGroup from "../../components/RadioButton/RadioButtonGroup";

const RatingsPage = () => {
  //list of all users
  const [users, setUsers] = useState<Array<User>>([]);

  //list of all SSKs
  const [universities, setUniversities] = useState<Array<University>>([]);

  const [univerititiesLogos, setUniversitiesLogos] = useState<Array<string>>(
    []
  );

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

  //additional values for handling opening users rating after univerity line is clicked
  const searchLineRef = useRef<HTMLInputElement>(null);
  const [chosenUniverity, setChosenUniversity] = useState<string>("");

  const ratingTypes = ["Спортивные клубы", "Участники"];
  //0 = show sport clubs, 1 = show students (users)
  const [selectedRatingType, onRatingTypeSelect] = useList(ratingTypes);

  const sortOptions = ["Расстоянию", "Активностям"];

  const genderOptions = ["Все", "Юноши", "Девушки"];

  //List view settings
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [fetchCount, setFetchCount] = useState<number>(100000);

  const [pageCount, setPageCount] = useState<number>(10);
  const [pageChanged, setPageChanged] = useState<boolean>(false);

  //For correct paging
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<
    Array<University>
  >([]);

  const onRatingTypeSelected = (index: number) => {
    onRatingTypeSelect(index);
    setPage(0);
    setPageChanged(false);

    if (index == 0) {
      setMaxPage(Math.ceil(universities.length / pageCount));
    } else {
      setGenderMode(0);
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

  const fetchLogos = async () => {
    setUniversitiesLogos(() => {
      return [];
    });

    for (let i = 0; i < showedUniversities.length; i++) {
      const logo = await getLogo(showedUniversities[i].id);
      console.log(logo);
      setUniversitiesLogos((v) => {
        return [...v, logo];
      });
    }
  };

  useEffect(() => {
    setLoadingUsers(true);
    setLoadingUniversities(true);

    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(0, fetchCount);

      if (fetchedUsers.length == 0) {
        return;
      }

      fetchedUsers.sort((u1, u2) => {
        return u2.total_distance - u1.total_distance;
      });

      setMaxUserDistance(fetchedUsers[0].total_distance);

      let fetchedShowedUsers = fetchedUsers.slice(
        page * pageCount,
        (page + 1) * pageCount
      );

      setUsers(fetchedUsers);

      setFilteredUsers(fetchedUsers);

      setShowedUsers(fetchedShowedUsers);

      setLoadingUsers(false);
    };

    fetchUsers();

    const fetchSSKs = async () => {
      const fetchedUniversities = await getUniversities(0, fetchCount);

      if (fetchedUniversities.length == 0) {
        return;
      }

      fetchedUniversities.sort((u1, u2) => {
        return u2.total_distance - u1.total_distance;
      });
      setMaxUniversityDistance(fetchedUniversities[0].total_distance);

      let fetchedShowedUniversities = fetchedUniversities.slice(
        page * pageCount,
        (page + 1) * pageCount
      );

      setUniversities(fetchedUniversities);

      setFilteredUniversities(fetchedUniversities);

      setShowedUniversities(() => {
        return fetchedShowedUniversities;
      });

      await fetchLogos();

      setLoadingUniversities(false);

      setMaxPage(Math.ceil(fetchedUniversities.length / pageCount));
    };

    fetchSSKs();
  }, []);

  useEffect(() => {
    if (pageChanged) {
      setPageChanged(false);

      if (selectedRatingType == "Участники") {
        let finalList = filteredUsers.slice(
          page * pageCount,
          (page + 1) * pageCount
        );

        setShowedUsers(finalList);
      } else {
        setPageChanged(false);

        let finalList = filteredUniversities.slice(
          page * pageCount,
          (page + 1) * pageCount
        );

        setShowedUniversities(() => {
          return finalList;
        });

        fetchLogos();
      }

      return;
    }

    if (selectedRatingType == "Участники") {
      let userList: Array<User> = [];

      userList = isSearching ? foundUsers : users;

      if (sortModeChanged) {
        userList.sort((u1, u2) => {
          return sortMode == 0
            ? u2.total_distance - u1.total_distance
            : u2.total_activities - u1.total_activities;
        });

        setSortModeChanged(false);
      }

      if (genderModeChanged) {
        userList = userList.filter(filterUsers);
        setGenderModeChanged(false);
      }

      setMaxPage(Math.ceil(userList.length / pageCount));

      setFilteredUsers(userList);

      userList = userList.slice(page * pageCount, (page + 1) * pageCount);

      setShowedUsers(userList);
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

      setFilteredUniversities(universitiesList);

      universitiesList = universitiesList.slice(
        page * pageCount,
        (page + 1) * pageCount
      );

      setShowedUniversities(() => {
        return universitiesList;
      });

      fetchLogos();
    }
  }, [sortMode, genderMode, isSearching, foundUsers, page]);

  const onSortSelect = (index: number) => {
    setSortMode(index);
    setSortModeChanged(true);
    setPage(0);
    setPageChanged(false);
  };

  const onGenderSelect = (index: number) => {
    setGenderMode(index);
    setGenderModeChanged(true);
    setPage(0);
    setPageChanged(false);
  };

  const onUsersSearchComplete = (objList: Array<User>) => {
    if (objList.length > 0) {
      onGenderSelect(0);
      setFoundUsers(objList);
      setSearching(true);
      setPage(0);
      setPageChanged(false);
    } else {
      setSearching(false);
    }
  };

  const onUniversitySearchComplete = (objList: Array<University>) => {
    if (objList.length > 0) {
      setFoundUniversities(objList);
      setSearching(true);
      setPage(0);
      setPageChanged(false);
    } else {
      setSearching(false);
    }
  };

  function isUser(obj: any): obj is User {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.lastName === "string"
    );
  }

  function isUniversity(obj: any): obj is University {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.full_organization_name === "string"
    );
  }

  const onSearchComplete = (objList: Array<User | University>) => {
    if (isUser(objList[0])) {
      onGenderSelect(0);
      setFoundUsers(objList as Array<User>);
      setSearching(true);
      setPage(0);
      setPageChanged(false);
    } else if (isUniversity(objList[0])) {
      setFoundUniversities(objList as Array<University>);
      setSearching(true);
      setPage(0);
      setPageChanged(false);
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

  const universitySearchHandler = (university: University) => {
    return (
      university.ssk_name +
      "\nУниверситет: " +
      university.full_organization_name
    );
  };

  const objectHandler = (obj: User | University) => {
    if (isUser(obj)) {
      const user = obj as User;
      return (
        user.lastName +
        " " +
        user.firstName +
        "\nСпортивный клуб: " +
        user.university
      );
    } else if (isUniversity(obj)) {
      const university = obj as University;
      return (
        university.ssk_name +
        "\nУниверситет: " +
        university.full_organization_name
      );
    }

    return "";
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

  const objectToNodeConverter = (obj: User | University) => {
    if (isUser(obj)) {
      const user = obj as User;
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
    } else if (isUniversity(obj)) {
      const university = obj as University;
      return (
        <div className={s.rating_student_search_element}>
          <p className={s.invert_default_text}>{university.ssk_name}</p>
          <p
            className={s.invert_subtext}
          >{`Университет: ${university.full_organization_name}`}</p>
          <hr className={s.hr_horizontal} style={{ height: "3px" }} />
        </div>
      );
    }

    return "";
  };

  const onUniversityRatingLineClicked = (university: University) => {
    setPage(0);

    setChosenUniversity(university.ssk_name);

    const lowerCaseName = university.ssk_name.toLowerCase();

    setGenderMode(0);

    let univerityUsers = users.filter(
      (user) =>
        user &&
        user.university &&
        user.university.toLowerCase() == lowerCaseName
    );

    setFoundUsers(univerityUsers);

    setSearching(true);

    onRatingTypeSelect(1);
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
      setPageChanged(true);
    }
  };

  const handlePagePrev = () => {
    if (page > 0) {
      setPage(page - 1);
      setPageChanged(true);
    }
  };

  const showAllUsersClicked = () => {
    setSearching(false);
    setPage(0);
    setChosenUniversity("");
    setGenderMode(0);
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

        <SearchLine<User | University>
          inputRef={searchLineRef}
          objectsArray={
            selectedRatingType == "Участники" ? users : universities
          }
          objectToNodeConverter={objectToNodeConverter}
          objectHandler={objectHandler}
          onSearchComplete={onSearchComplete}
          placeholder={
            selectedRatingType == "Участники"
              ? "Начните вводить ФИО участника или название спортивного клуба, в котором он состоит"
              : "Начните вводить название спортивного клуба"
          }
          onReturnAllMatchingResultsButton={returnAllMatchingResultsButton}
        />

        {/* {selectedRatingType == "Участники" && (
          <SearchLine
            inputRef={searchLineRef}
            objectsArray={users}
            objectToNodeConverter={userSearchElement}
            objectHandler={userSearchHandler}
            onSearchComplete={onUsersSearchComplete}
            placeholder={
              "Начните вводить ФИО участника или название спортивного клуба, в котором он состоит"
            }
            onReturnAllMatchingResultsButton={returnAllMatchingResultsButton}
          />
        )}
        {selectedRatingType == "Спортивные клубы" && (
          <SearchLine
            objectsArray={universities}
            objectToNodeConverter={universitySearchElement}
            objectHandler={universitySearchHandler}
            onSearchComplete={onUniversitySearchComplete}
            placeholder={"Начните вводить название спортивного клуба"}
            onReturnAllMatchingResultsButton={returnAllMatchingResultsButton}
          />
        )} */}
      </div>
      <hr className={s.hr_horizontal} />

      {selectedRatingType == "Участники" &&
        isSearching &&
        chosenUniverity.length > 0 && (
          <div className={s.rating_page_search_result_title_container}>
            <button
              className={s.rating_page_search_title_back_button}
              onClick={showAllUsersClicked}
            >
              <Triangle className={s.triangle_svg} />
              <p className={s.default_text}>Назад ко всем</p>
            </button>
            <p className={s.default_text}>
              Рейтинг спортивного клуба «{chosenUniverity}»
            </p>
          </div>
        )}

      <div className={s.rating_sort_type_container}>
        <div className={s.rating_select_container}>
          <p className={s.default_text}>Сортировать по</p>
          <Select options={sortOptions} onSelectClicked={onSortSelect} />
        </div>
        <div className={s.rating_select_container}>
          {selectedRatingType === "Участники" && (
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
      {/* <div className={s.page_switch_div}>
        <Button text="Назад" onClick={handlePagePrev} />
        <p className={s.default_text}>Страница {page + 1}</p>
        <Button text="Вперёд" onClick={handlePageNext} />
      </div>
      <hr className={s.hr_horizontal} /> */}
      {selectedRatingType === "Участники" && (
        <div className={s.ratings_columns_titles}>
          <p className={s.minitext}>Участник</p>
          <p className={s.minitext}>Расстояние</p>
          <p className={s.minitext}>Активности</p>
        </div>
      )}
      {selectedRatingType === "Участники" &&
        showedUsers.map((user, index) => (
          <div className={s.ratings_container} key={index}>
            <RatingLine
              name={
                user.lastName +
                " " +
                (user.lastName.length + user.firstName.length > 14
                  ? `${user.firstName[0]}.`
                  : user.firstName)
              }
              index={index + 1 + page * pageCount}
              activities={user.total_activities}
              distance={user.total_distance}
              max_distance={maxUserDistance}
            />
          </div>
        ))}
      {selectedRatingType === "Спортивные клубы" && (
        <div className={s.ratings_columns_titles}>
          <p className={s.minitext}>Спортивный клуб</p>
          <p className={s.minitext}>Расстояние</p>
          <p className={s.minitext}>Активности</p>
        </div>
      )}
      {selectedRatingType === "Спортивные клубы" &&
        showedUniversities.map((university, index) => (
          <div className={s.ratings_container} key={index}>
            <RatingLine
              name={university.ssk_name}
              index={index + 1 + page * pageCount}
              activities={university.total_activities}
              distance={university.total_distance}
              max_distance={maxUniversityDistance}
              clickable
              onLineClicked={() => onUniversityRatingLineClicked(university)}
              image={univerititiesLogos[index]}
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
