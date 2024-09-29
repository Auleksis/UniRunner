import s from "./Link.module.css";
import { Link as RRDLink, LinkProps as RRDLinkProps } from "react-router-dom";

export interface LinkProps extends RRDLinkProps {
  text: string;
}

const Link: React.FunctionComponent<LinkProps> = ({
  text,
  children,
  ...linkProps
}) => {
  return (
    <RRDLink className={s.link} {...linkProps}>
      <p className={s.default_text}>{text}</p>
      {children}
    </RRDLink>
  );
};

export default Link;
