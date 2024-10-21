import s from "./ActivityStats.module.css";

export interface ActivityStatsProps {
  count: number;
}

const ActivityStats: React.FunctionComponent<ActivityStatsProps> = ({
  count,
}) => {
  return (
    <div className={s.entity_activities_div}>
      <div className={s.entity_activities_info_div}>
        <div className={s.entity_activities_info_text_div}>
          <p className={s.small_text}>Активности</p>
          <p className={s.subtext}>Общее количество активностей</p>
        </div>
        <div className={s.entity_activities_count_div}>
          <p className={s.default_text}>{count}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;
