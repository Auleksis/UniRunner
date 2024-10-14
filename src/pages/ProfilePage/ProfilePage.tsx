import s from "./ProfilePage.module.css";
import { useEffect, useState } from "react";
import Link from "../../components/Link/Link";
import DistanceStats from "../../components/DistanceStats/DistanceStats";
import { User } from "../../models/User";
import { getUserData } from "../../services/api";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";

const ProfilePage = () => {
  const [userData, setUserData] = useState<User>();
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await getUserData();

      if (!data) {
        console.log("Error while loadind user data");
      }

      setUserData(data);

      var date1 = new Date(data.birthday);
      var date2 = new Date();

      var diff = new Date(date2.getTime() - date1.getTime());

      setAge(diff.getUTCFullYear() - 1970);
    };
    loadData();
  }, []);

  const handlePhotoChanged = (photo: File) => {
    console.log(photo);
  };

  return (
    <div>
      <h1 className={s.title}>Профиль</h1>
      <hr className={s.hr_horizontal} />
      <div className={s.user_info_div}>
        <div className={s.info_div}>
          <h1 className={s.title}>
            {userData?.firstName + " " + userData?.lastName}
          </h1>
          <div className={s.info_details_div}>
            <p className={s.default_text}>
              Спортивный клуб: {userData?.university}
            </p>
            <p className={s.default_text}>Пол: {userData?.gender}</p>
            <p className={s.default_text}>Возраст: {age}</p>
          </div>
        </div>
        <div className={s.user_photo}>
          <ProfilePhoto onPhotoChanged={handlePhotoChanged} />
        </div>
      </div>

      <hr className={s.hr_horizontal} />

      <div className={s.info_div}>
        <div className={s.info_details_div}>
          <div className={s.text_link_div}>
            <p className={s.default_text}>Место в общем рейтинге: 1</p>
            <Link text="перейти к рейтингу участников" to={"#"} />
          </div>
          <div className={s.text_link_div}>
            <p className={s.default_text}>
              Место в рейтинге СК {userData?.university}: 1
            </p>
            <Link
              text="перейти к рейтингу участников спортивного клуба"
              to={"#"}
            />
          </div>
        </div>
        <DistanceStats cur_dist={20} max_dist={20} />
      </div>
    </div>
  );
};

export default ProfilePage;
