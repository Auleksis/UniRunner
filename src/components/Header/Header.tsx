/// <reference types="vite-plugin-svgr/client" />

import s from "./Header.module.css";

import Sun from "/src/assets/icons/sun.svg";
import Moon from "/src/assets/icons/moon.svg";
import Runner from "/src/assets/icons/runner.svg?react";

import Switch from "../Switch/Switch";
import Link from "../Link/Link";
import ProfileButton from "../ProfileButton/ProfileButton";

const Header = () => {
  return (
    <>
      <header>
        <nav className={s.header_container}>
          <div className={s.name_logo_container}>
            <h1 className={s.logo_title}>UniRunner</h1>
            <Runner className={s.logo_svg} />
          </div>

          <div className={s.buttons_container}>
            <Switch handleChange={() => {}} image_on={Moon} image_off={Sun} />
            <ProfileButton />
            <Link to={"/about"} text="О проекте" />
            <Link to={"/ratings"} text="Рейтинги" />
            <Link to={"/"} text="Мероприятия" />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
