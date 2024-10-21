/// <reference types="vite-plugin-svgr/client" />

import s from "./Header.module.css";

import Kronbars from "/src/assets/images/kronbars_image.png";

import Link from "../Link/Link";
import ProfileButton from "../ProfileButton/ProfileButton";
import { useState } from "react";
import ImageLink from "../ImageLink/ImageLink";

const Header = () => {
  //-1 = main Page
  //0 = events
  //1 = ratings
  //2 = about
  const [selectedSection, setSelectedSection] = useState<number>(-1);

  const Logo = () => {
    return <img src={Kronbars} className={s.header_icon_logo} />;
  };

  return (
    <>
      <header className={s.header}>
        <div
          className={s.header_icon_div}
          onClick={() => setSelectedSection(-1)}
        >
          <ImageLink to="/" image={Logo()} />
        </div>

        <nav className={s.header_nav_div}>
          <Link
            to={"/events"}
            text="Мероприятия"
            active={selectedSection == 0}
            onClick={() => setSelectedSection(0)}
          />
          <Link
            to={"/ratings"}
            text="Рейтинги"
            active={selectedSection == 1}
            onClick={() => setSelectedSection(1)}
          />
          <Link
            to={"/about"}
            text="О проекте"
            active={selectedSection == 2}
            onClick={() => setSelectedSection(2)}
          />
        </nav>

        <div className={s.header_profile_button_div}>
          <ProfileButton />
        </div>
      </header>
    </>
  );
};

export default Header;
