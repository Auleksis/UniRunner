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
  loadImageFunction?: (index: number) => Promise<string>;
}

const RatingLine: React.FunctionComponent<RatingLineProps> = (
  props: RatingLineProps
) => {
  const [loadedImage, setLoadedImage] = useState<undefined | string>(undefined);

  useEffect(() => {
    const fetchImage = async () => {
      if (props.loadImageFunction) {
        const image = await props.loadImageFunction(props.index);
        setLoadedImage(() => {
          return image;
        });
      }
    };

    fetchImage();
  }, []);

  return (
    <div
      className={s.line_container}
      style={props.clickable ? {} : { pointerEvents: "none" }}
      onClick={props.onLineClicked}
    >
      {!loadedImage && (
        <div className={s.entity_index_div}>
          <p className={s.subtitle}>{props.index}</p>
        </div>
      )}

      {loadedImage && (
        <div>
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
