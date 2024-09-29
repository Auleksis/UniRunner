import { useEffect, useState } from "react";
import keycloak from "../../Keycloak";
import s from "./ProfilePage.module.css";
import { KeycloakProfile } from "keycloak-js";
import Link from "../../components/Link/Link";
import DistanceStats from "../../components/DistanceStats/DistanceStats";
import axios from "axios";

//TODO SETUP REDUX

export type User = {
  email: string;
  emailVerified: string;

  firstName: string;
  lastName: string;

  gender: Array<string>;

  university: Array<string>;

  birthday: Array<string>;

  id: string;

  username: string;
};

const ProfilePage = () => {
  const [userData, setUserData] = useState<KeycloakProfile>();
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const fullData = await keycloak.loadUserProfile();
      setUserData(fullData);

      console.log(fullData);

      console.log(keycloak.token);

      // const url = "http://localhost:8081/api/v1/users/list?page=1&size=10";

      // const ans = await axios.get(url, {
      //   headers: { Authorization: `Bearer ${keycloak.token}` },
      // });
      // console.log(ans);

      const birthday: string = fullData.attributes?.birthday[0] as string;

      var data1 = new Date(birthday);
      var data2 = new Date();

      var diff = new Date(data2.getTime() - data1.getTime());

      console.log(diff);

      setAge(diff.getUTCFullYear() - 1970);
    };
    loadData();
  }, []);

  return (
    <div>
      <h1 className={s.title}>Профиль</h1>
      <hr className={s.hr_horizontal} />
      <div className={s.info_div}>
        <h1 className={s.title}>
          {userData?.firstName + " " + userData?.lastName}
        </h1>
        <div className={s.info_details_div}>
          <p className={s.default_text}>
            Спортивный клуб:{" "}
            {userData?.attributes
              ? (userData?.attributes["university"] as string)
              : ""}
          </p>
          <p className={s.default_text}>
            Пол:{" "}
            {userData?.attributes
              ? (userData?.attributes["gender"] as string)
              : ""}
          </p>
          <p className={s.default_text}>Возраст: {age}</p>
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
              Место в рейтинге СК {userData?.attributes["university"]}: 1
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
