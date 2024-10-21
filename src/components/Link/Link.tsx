import s from "./Link.module.css";
import { Link as RRDLink, LinkProps as RRDLinkProps } from "react-router-dom";

export interface LinkProps extends RRDLinkProps {
  text: string;
  active?: boolean;
}

const Link: React.FunctionComponent<LinkProps> = ({
  text,
  active,
  ...linkProps
}) => {
  return (
    <RRDLink className={active ? s.selected_link : s.link} {...linkProps}>
      <p className={s.default_text}>{text}</p>
    </RRDLink>
  );
};

export default Link;
