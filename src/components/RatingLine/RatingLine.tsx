import DistanceStats from "../DistanceStats/DistanceStats";
import s from "./RatingLine.module.css";
import Person from "/src/assets/icons/fight.svg?react";

export interface RatingLineProps {
  index: number;
  name: string;
  distance: number;
  max_distance: number;
  activities: number;
}

const RatingLine: React.FunctionComponent<RatingLineProps> = (
  props: RatingLineProps
) => {
  return (
    <div className={s.line_container}>
      <div className={s.entity_index_div}>
        <p className={s.subtitle}>{props.index}</p>
      </div>
      <div className={s.entity_name_div}>
        <p className={s.default_text}>{props.name}</p>
      </div>
      <DistanceStats cur_dist={props.distance} max_dist={props.max_distance} />
      <div className={s.entity_activities_div}>
        <div className={s.entity_activities_info_div}>
          <div className={s.entity_activities_info_text_div}>
            <p className={s.small_text}>Активности</p>
            <p className={s.subtext}>Общее количество активностей</p>
          </div>
          <div className={s.entity_activities_count_div}>
            <p className={s.default_text}>{props.activities}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingLine;
