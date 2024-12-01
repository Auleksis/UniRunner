import React, { useEffect } from "react";
import s from "./DistanceStats.module.css";
import Runner from "/src/assets/icons/runner.svg?react";

/**
 * @param max_dist Maximum of all distances in the list.
 * @param cur_dist Distance of the current person
 */
export interface DistanceStatsProps {
  max_dist?: number;
  cur_dist: number;
  grid_based?: boolean;
}

const DistanceStats: React.FunctionComponent<DistanceStatsProps> = ({
  max_dist,
  cur_dist,
  grid_based,
}) => {
  // const widthRatio = (cur_dist / max_dist) * 70 + 30;
  const widthRatio = 100;
  return (
    <div className={s.dist_container} style={{ width: `${widthRatio}%` }}>
      {grid_based ? (
        <div className={s.dist_container_text}>
          <p className={s.default_text}>Общее расстояние:</p>
        </div>
      ) : (
        <p className={s.default_text}>Общее расстояние:</p>
      )}

      <div className={s.man_div}>
        <p className={s.title}>
          {Math.round((cur_dist / 1000 + Number.EPSILON) * 10) / 10 +
            (screen.width <= 610 ? "" : " км")}
        </p>
        <div className={s.dist_container_text}>
          <Runner className={s.man_svg} />
        </div>
      </div>
    </div>
  );
};

export default DistanceStats;
