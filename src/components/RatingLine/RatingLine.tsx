import { useEffect, useState } from "react";
import ActivityStats from "../ActivityStats/ActivityStats";
import DistanceStats from "../DistanceStats/DistanceStats";
import s from "./RatingLine.module.css";

export interface RatingLineProps {
  index: number;
  name: string;
  distance: number;
  max_distance: number;
  activities: number;
  clickable?: boolean;
  onLineClicked?: () => void;
  image?: Promise<Blob>;
}

const RatingLine: React.FunctionComponent<RatingLineProps> = (
  props: RatingLineProps
) => {
  const [loadedImage, setLoadedImage] = useState<string>("");

  useEffect(() => {
    if (props.image) {
      props.image.then((value) => {
        const imageURL = URL.createObjectURL(value);
        setLoadedImage(imageURL);
      });
    }
  }, []);

  return (
    <div
      className={`${s.line_container} ${s.line_container_grid}`}
      style={props.clickable ? {} : { pointerEvents: "none" }}
      onClick={props.onLineClicked}
    >
      {loadedImage.length == 0 && (
        <div className={s.entity_index_div}>
          <p className={s.subtitle}>{props.index}</p>
        </div>
      )}

      {loadedImage.length != 0 && (
        <div className={s.line_image_div}>
          <img className={s.line_image_container} src={loadedImage} />
        </div>
      )}

      <div className={s.entity_name_div}>
        <p className={s.default_text}>{props.name}</p>
      </div>
      <DistanceStats
        cur_dist={props.distance}
        max_dist={props.max_distance}
        grid_based
      />
      <ActivityStats count={props.activities} />
    </div>
  );
};

export default RatingLine;
