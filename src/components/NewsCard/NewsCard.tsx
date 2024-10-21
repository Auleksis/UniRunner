import s from "./NewsCard.module.css";

export interface NewsCardProps {
  title: string;
  text: string;
  newsUrl?: string;
}

const NewsCard: React.FunctionComponent<NewsCardProps> = ({
  title,
  text,
  newsUrl,
}) => {
  return (
    <div className={s.news_card_div}>
      <img
        className={s.news_card_image}
        src="/src/assets/images/news_card_back.png"
      />
      <div className={s.news_card_text}>
        <div className={s.news_card_text_title}>
          <p className={s.small_text}>{title}</p>
        </div>
        <p className={s.subtext_v_2}>{text}</p>
        <div className={s.news_card_text_cover}></div>
      </div>
    </div>
  );
};

export default NewsCard;
