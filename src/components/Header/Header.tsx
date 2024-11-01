/// <reference types="vite-plugin-svgr/client" />

import s from "./Header.module.css";

import Kronbars from "/src/assets/images/kronbars_image.png";

import Link from "../Link/Link";
import ProfileButton from "../ProfileButton/ProfileButton";
import { useEffect, useState } from "react";
import ImageLink from "../ImageLink/ImageLink";

const Header = () => {
  //-1 = remove selection
  //0 = events
  //1 = ratings
  //2 = about
  //3 = rules
  const [selectedSection, setSelectedSection] = useState<number>(-1);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.endsWith("events")) {
      setSelectedSection(0);
    } else if (pathname.endsWith("ratings")) {
      setSelectedSection(1);
    } else if (pathname.endsWith("about")) {
      setSelectedSection(2);
    }
  }, []);

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
            to={"/rules"}
            text="Правила"
            active={selectedSection == 3}
            onClick={() => setSelectedSection(3)}
          />
          <Link
            to={"/about"}
            text="О проекте"
            active={selectedSection == 2}
            onClick={() => setSelectedSection(2)}
          />
        </nav>

        <div className={s.header_profile_button_div}>
          <ProfileButton onMenuItemClicked={() => setSelectedSection(-1)} />
        </div>
      </header>
    </>
  );
};

export default Header;
