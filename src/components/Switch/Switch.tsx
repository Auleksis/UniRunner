import React, { useState } from "react";
import s from "./Switch.module.css";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface Props {
  isOn?: boolean;
  handleChange: (e: ChangeEvent) => void;
  image_on?: string;
  image_off?: string;
}

const Switch = (props: Props) => {
  const [isOn, setOn] = useState<boolean>(props.isOn ? true : false);

  const handleChange = (e: ChangeEvent) => {
    setOn(e.target.checked);
    props.handleChange(e);
  };

  return (
    <div className={s.container}>
      <input
        className={s.switch_checkbox}
        id={"switch_new"}
        type="checkbox"
        onChange={handleChange}
        checked={isOn}
      />
      <label className={s.switch_label} htmlFor={"switch_new"}>
        <span className={s.switch_button}>
          {props.image_on && props.image_off && (
            <img
              src={isOn ? props.image_on : props.image_off}
              className={s.side_icon}
            />
          )}
        </span>
      </label>
    </div>
  );
};

export default Switch;
