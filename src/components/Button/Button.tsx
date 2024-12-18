import s from "./Button.module.css";

export interface ButtonProps extends React.ComponentProps<"button"> {
  text: string;
  fullWidth?: boolean;
  fontSize?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  fullWidth,
  fontSize,
  children,
  ...buttonProps
}) => {
  return (
    <button
      className={s.button_container}
      style={{ width: fullWidth ? "100%" : "fit-content" }}
      {...buttonProps}
    >
      <p className={s.default_text} style={{ fontSize: fontSize }}>
        {text}
      </p>
      {children}
    </button>
  );
};

export default Button;
