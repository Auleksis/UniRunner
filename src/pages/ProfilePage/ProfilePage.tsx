import s from "./ProfilePage.module.css";
import { useEffect } from "react";
import DistanceStats from "../../components/DistanceStats/DistanceStats";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import Person from "/src/assets/icons/fight.svg?react";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { getUserData } from "../../features/user/UserThunk";
import { cleanPacerInfo } from "../../features/user/User";
import ActivityStats from "../../components/ActivityStats/ActivityStats";

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

  const handlePhotoChanged = (photo: File) => {};

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
            <div className={s.profile_page_stats_container}>
              <div className={s.profile_page_stats_title}>
                <p className={s.default_text}>Расстояние</p>
              </div>
              <div className={s.profile_page_stats_field_div}>
                <DistanceStats
                  cur_dist={userData.total_distance}
                  max_dist={userData.total_distance}
                />
              </div>
              <div className={s.profile_page_stats_title}>
                <p className={s.default_text}>Активности</p>
              </div>
              <div className={s.profile_page_stats_field_div}>
                <ActivityStats count={userData.total_activities} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
