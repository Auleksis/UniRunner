import React from "react";
import s from "./DistanceStats.module.css";
import Runner from "/src/assets/icons/runner.svg?react";

/**
 * @param max_dist Maximum of all distances in the list.
 * @param cur_dist Distance of the current person
 */
export interface DistanceStatsProps {
  max_dist?: number;
  cur_dist: number;
}

const DistanceStats: React.FunctionComponent<DistanceStatsProps> = ({
  max_dist,
  cur_dist,
}) => {
  // const widthRatio = (cur_dist / max_dist) * 70 + 30;
  const widthRatio = 100;
  return (
    <div className={s.dist_container} style={{ width: `${widthRatio}%` }}>
      <p className={s.default_text}>Общее расстояние:</p>
      <div className={s.man_div}>
        <p className={s.title}>{cur_dist / 1000 + " км"}</p>
        <Runner className={s.man_svg} />
      </div>
    </div>
  );
};

export default DistanceStats;
