import { useKeycloak } from "@react-keycloak/web";
import s from "./ProfileButton.module.scss";
import Button from "../Button/Button";

import UserIcon from "/src/assets/icons/user_profile.svg?react";
import ExitIcon from "/src/assets/icons/exit.svg?react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";

export interface ProfileButtonProps extends React.ComponentProps<"button"> {
  onMenuItemClicked: () => void;
}

const ProfileButton: React.FunctionComponent<ProfileButtonProps> = ({
  onMenuItemClicked,
  ...buttonProps
}) => {
  const { keycloak } = useKeycloak();

  const [open, setOpen] = useState<boolean>(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setOpen(false);
  });

  const navigate = useNavigate();

  interface MenuItemProps extends React.ComponentProps<"button"> {
    key: number;
    text: string;
    svg: React.ReactNode;
  }

  const options: Array<MenuItemProps> = [
    {
      key: 0,
      text: "Перейти в профиль",
      svg: <UserIcon className={s.menu_item_profile_icon} />,
      onClick: () => {
        navigate("/profile");
        onMenuItemClicked();
      },
    },
    {
      key: 1,
      text: "Выйти",
      svg: <ExitIcon className={s.menu_item_exit_icon} />,
      onClick: () => {
        keycloak.logout();
        onMenuItemClicked();
      },
    },
  ];

  const MenuItem: React.FunctionComponent<MenuItemProps> = ({
    text,
    svg,
    ...buttonProps
  }) => {
    return (
      <button className={s.menu_item_div} {...buttonProps}>
        <div className={s.svg_div}>
          {svg}
          <hr className={s.vertical_line}></hr>
        </div>
        <p className={s.invert_subtext}>{text}</p>
      </button>
    );
  };

  const itemsList = options.map((option) => {
    return (
      <MenuItem
        text={option.text}
        svg={option.svg}
        key={option.key}
        onClick={option.onClick}
      />
    );
  });

  const handleProfileButtonClicked = () => {
    setOpen(!open);
  };

  return keycloak.authenticated ? (
    <div ref={ref}>
      <button
        className={s.profile_button}
        onClick={handleProfileButtonClicked}
        {...buttonProps}
      >
        <UserIcon className={s.profile_svg} />
      </button>

      {open && <div className={s.menu_div}>{itemsList}</div>}
    </div>
  ) : (
    <Button text="Войти" onClick={() => keycloak.login()} />
  );
};

export default ProfileButton;
