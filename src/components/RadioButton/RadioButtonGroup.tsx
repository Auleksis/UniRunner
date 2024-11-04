import s from "./RadioButton.module.css";

import React from "react";

interface RadioButtonProps extends React.ComponentProps<"button"> {
  text: string;
  isSelected: boolean;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
  text,
  isSelected,
  ...buttonProps
}) => {
  return (
    <button
      className={`${isSelected ? s.active : s.inactive}`}
      {...buttonProps}
    >
      <p className={s.default_text}>{text}</p>
    </button>
  );
};

interface RadioButtonGroupProps extends React.ComponentProps<"div"> {
  options: Array<string>;
  onSelected: (index: number) => void;
  selected: string;
}

const RadioButtonGroup: React.FunctionComponent<RadioButtonGroupProps> = ({
  options,
  onSelected,
  selected,
  ...divProps
}) => {
  return (
    <div {...divProps}>
      {options.map((option, index) => (
        <RadioButton
          key={index}
          text={option}
          isSelected={option === selected}
          onClick={() => onSelected(index)}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
