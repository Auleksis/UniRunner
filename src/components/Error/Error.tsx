import s from "./Error.module.css";
import ErrorSvg from "/src/assets/icons/error.svg";

export interface ErrorProps {
  text: string;
}

const Error: React.FunctionComponent<ErrorProps> = ({ text }) => {
  return (
    <div className={s.error_div}>
      <img className={s.error_icon} src={ErrorSvg} />
      <p className={s.error_text}>{text}</p>
    </div>
  );
};

export default Error;
