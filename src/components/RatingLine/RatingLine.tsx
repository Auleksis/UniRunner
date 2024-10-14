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
      <div className={s.line_entity_index_name}>
        <p className={s.subtitle}>{props.index}</p>
        <p className={s.subtitle}>{props.name}</p>
      </div>
      <div className={s.line_distance_container}>
        <DistanceStats
          cur_dist={props.distance}
          max_dist={props.max_distance}
        />
      </div>
      <div className={s.line_entity_additional_value_container}>
        <div className={s.line_entity_additional_info}>
          <Person className={s.person_activities_svg} />
          <p className={s.default_text}>Общее число активностей</p>
        </div>
        <p className={s.title_2}>{props.activities}</p>
      </div>
    </div>
  );
};

export default RatingLine;
