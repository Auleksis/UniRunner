import s from "./BriefRatingLine.module.css";

export interface BriefRatingLineProps {
  index: number;
  text: string;
}

const BriefRatingLine: React.FunctionComponent<BriefRatingLineProps> = ({
  index,
  text,
}) => {
  return (
    <div className={s.brief_rating_line_div}>
      <div className={s.brief_rating_line_index}>
        <p className={s.accent_subtitle}>{index}.</p>
      </div>
      <div className={s.brief_rating_line_text_div}>
        <p className={s.default_text}>{text}</p>
      </div>
    </div>
  );
};

export default BriefRatingLine;
