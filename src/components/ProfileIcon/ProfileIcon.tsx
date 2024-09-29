import s from "./ProfileIcon.module.css";

import UserIcon from "/src/assets/icons/profile.svg?react";

const ProfileIcon = () => {
  return (
    <button>
      <UserIcon className={s.profile_svg} />
    </button>
  );
};

export default ProfileIcon;
