import { ReactNode } from "react";
import s from "./ImageLink.module.css";
import { Link as RRDLink, LinkProps as RRDLinkProps } from "react-router-dom";

export interface ImageLinkProps extends RRDLinkProps {
  image: ReactNode;
}

const ImageLink: React.FunctionComponent<ImageLinkProps> = ({
  image,
  ...linkProps
}) => {
  return <RRDLink {...linkProps}>{image}</RRDLink>;
};

export default ImageLink;
