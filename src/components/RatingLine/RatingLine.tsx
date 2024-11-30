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
  image?: string;
}

const RatingLine: React.FunctionComponent<RatingLineProps> = (
  props: RatingLineProps
) => {
  return (
    <div
      className={s.line_container}
      style={props.clickable ? {} : { pointerEvents: "none" }}
      onClick={props.onLineClicked}
    >
      {!props.image && (
        <div className={s.entity_index_div}>
          <p className={s.subtitle}>{props.index}</p>
        </div>
      )}

      {props.image && (
        <div>
          <img className={s.line_image_container} src={props.image} />
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
