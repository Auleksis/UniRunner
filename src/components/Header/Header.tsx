/// <reference types="vite-plugin-svgr/client" />

import s from "./Header.module.css";

import Kronbars from "/src/assets/images/kronbars_image.png";
import Runiners from "/src/assets/images/runiners.png";
import Unirunners from "/src/assets/icons/RUNINERS_2.svg";
import Burger from "/src/assets/icons/burger.svg?react";

import Link from "../Link/Link";
import ProfileButton from "../ProfileButton/ProfileButton";
import { useEffect, useState } from "react";
import ImageLink from "../ImageLink/ImageLink";
import { useLocation } from "react-router-dom";

const Header = () => {
  //-2 = remove selection (in fullscreen nav bar too)
  //-1 = remove selection
  //0 = events
  //1 = ratings
  //2 = about
  //3 = rules
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const location = useLocation();

  const [burgerClicked, setBurgerClicked] = useState<boolean>(false);

  useEffect(() => {
    let pathname = location.pathname;

    if (pathname.charAt(pathname.length - 1) == "/") {
      pathname = pathname.slice(0, pathname.length - 1);
    }

    if (pathname.endsWith("events")) {
      setSelectedSection(0);
    } else if (pathname.endsWith("ratings")) {
      setSelectedSection(1);
    } else if (pathname.endsWith("about")) {
      setSelectedSection(2);
    } else if (pathname.endsWith("rules")) {
      setSelectedSection(3);
    }
  }, [location.pathname]);

  const Logo = () => {
    if (!burgerClicked) {
      return <img src={Unirunners} className={s.header_icon_logo} />;
    }
  };

  const handleBurgerClicked = () => {
    setBurgerClicked(!burgerClicked);
  };

  const handleNavBarButtonClicked = (index: number) => {
    setBurgerClicked(false);
    setSelectedSection(index);
  };

  return (
    <>
      <header className={burgerClicked ? s.header_fullscreen : s.header}>
        <div className={s.header_elements_div}>
          <div
            className={s.header_icon_div}
            onClick={() => setSelectedSection(-1)}
          >
            <ImageLink to="/" image={Logo()} />
            {/* <Unirunners className={s.unirunners_svg} /> */}
          </div>

          <nav className={s.header_nav_div}>
            <Link
              to={"/events"}
              text="События"
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
            <ProfileButton
              onMenuItemClicked={() => handleNavBarButtonClicked(-2)}
            />
          </div>

          <button
            className={s.header_burger_button}
            onClick={handleBurgerClicked}
          >
            <Burger className={s.header_burger_svg} />
          </button>
        </div>
        {burgerClicked && (
          <nav className={s.header_fullscreen_nav_div}>
            <Link
              to={"/"}
              text="Главная"
              active={selectedSection == -1}
              onClick={() => handleNavBarButtonClicked(-1)}
            />
            <Link
              to={"/events"}
              text="События"
              active={selectedSection == 0}
              onClick={() => handleNavBarButtonClicked(0)}
            />
            <Link
              to={"/ratings"}
              text="Рейтинги"
              active={selectedSection == 1}
              onClick={() => handleNavBarButtonClicked(1)}
            />
            <Link
              to={"/rules"}
              text="Правила"
              active={selectedSection == 3}
              onClick={() => handleNavBarButtonClicked(3)}
            />
            <Link
              to={"/about"}
              text="О проекте"
              active={selectedSection == 2}
              onClick={() => handleNavBarButtonClicked(2)}
            />
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
