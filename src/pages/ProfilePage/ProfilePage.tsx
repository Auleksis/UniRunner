import s from "./ProfilePage.module.css";
import { useEffect } from "react";
import DistanceStats from "../../components/DistanceStats/DistanceStats";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import Person from "/src/assets/icons/fight.svg?react";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { getUserData } from "../../features/user/UserThunk";
import { cleanPacerInfo } from "../../features/user/User";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.user);

  const fetchUserData = async () => {
    if (!userData.loaded && !userData.loading) {
      await dispatch(getUserData());
      // await dispatch(cleanPacerInfo());
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePhotoChanged = (photo: File) => {
    console.log(photo);
  };

  return (
    <div>
      {!userData.loaded && <p className={s.default_text}>Загрузка</p>}

      {userData.loaded && (
        <>
          <div className={s.page_intro_title_div}>
            <h1 className={s.default_text}>Профиль</h1>
          </div>
          <hr className={s.hr_horizontal} />
          <div className={s.user_info_div}>
            <div className={s.info_div}>
              <h1 className={s.title}>
                {userData.firstName + " " + userData.lastName}
              </h1>
              <div className={s.info_details_div}>
                <p className={s.default_text}>
                  Спортивный клуб: {userData.university}
                </p>
                <p className={s.default_text}>Пол: {userData.gender}</p>
                <p className={s.default_text}>Возраст: {userData.age}</p>
              </div>
            </div>
            {/* <div className={s.user_photo}>
              <ProfilePhoto onPhotoChanged={handlePhotoChanged} />
            </div> */}
          </div>

          <hr className={s.hr_horizontal} />

          <div className={s.info_div}>
            {/* <div className={s.info_details_div}>
              <div className={s.text_link_div}>
                <p className={s.default_text}>Место в общем рейтинге: 1</p>
                <Link text="перейти к рейтингу участников" to={"#"} />
              </div>
              <div className={s.text_link_div}>
                <p className={s.default_text}>
                  Место в рейтинге СК {userData.university}: 1
                </p>
                <Link
                  text="перейти к рейтингу участников спортивного клуба"
                  to={"#"}
                />
              </div>
            </div> */}
            <DistanceStats
              cur_dist={userData.total_distance}
              max_dist={userData.total_distance}
            />
            <div className={s.line_entity_additional_value_container}>
              <div className={s.line_entity_additional_info}>
                <Person className={s.person_activities_svg} />
                <p className={s.default_text}>Общее число активностей</p>
              </div>
              <p className={s.title_2}>{userData.total_activities}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
