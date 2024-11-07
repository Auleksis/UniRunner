import { useKeycloak } from "@react-keycloak/web";
import Button from "../../components/Button/Button";
import s from "./AboutPage.module.css";
import { Link } from "react-router-dom";

import Runner from "/src/assets/icons/runner.svg?react";
import Question from "/src/assets/icons/question.svg?react";
import Group from "/src/assets/icons/group.svg?react";
import Star from "/src/assets/icons/star.svg?react";

const AboutPage = () => {
  const { keycloak } = useKeycloak();
  return (
    <div className={s.about_page_container}>
      <div className={s.about_page_text_container}>
        <p className={s.title}>О НАС</p>

        <div className={s.about_page_svg_marked_text}>
          <p className={s.default_text}>
            Мы любим бег. Мы не ограничены материальными, временными и
            пространственными ресурсами. Нам нужны только кроссовки. Мы -
            <span className={s.black_text}>
              <a href={`https://t.me/unirunners`} target="_blank">
                {" "}
                сообщество студентов{" "}
              </a>{" "}
            </span>
            из Санкт-Петербурга, и мы влюблены в пробежки.
          </p>
          {/* <Runner className={s.svg_mark} /> */}
        </div>

        <div className={s.about_page_svg_marked_text}>
          {/* <Question className={s.svg_question_mark} /> */}
          <p className={s.default_text}>
            Хочешь пробежать свои первые 3 км по парку, либо делаешь недельные
            объемы для подготовки к марафонам?
          </p>
        </div>

        <div className={s.about_page_svg_marked_text}>
          <p className={s.default_text}>
            <span>
              <span className={s.black_text}>
                <a href="#" onClick={() => keycloak.login()}>
                  Присоединяйся
                </a>{" "}
              </span>
              к проекту и находи единомышленников в своём университете. Выходи
              на тренировку и собирай километры в{" "}
              <span className={s.black_text}>
                <Link to={"/ratings/"}> общий рейтинг </Link>
              </span>{" "}
              альма-матер.
            </span>
          </p>
          {/* <Group className={s.svg_group_mark} /> */}
        </div>
        <div className={s.about_page_svg_marked_text}>
          {/* <Star className={s.svg_mark} /> */}

          <p className={s.default_text}>
            Следи за статистикой в личном кабинете и совершенствуйся каждый
            день. Принимай участие в наших длительных тренировках и забегах.
            Тренируйся и становись счастливее.
          </p>
        </div>
        {!keycloak.authenticated && (
          <Button text="Присоединиться" onClick={() => keycloak.login()} />
        )}

        <div className={s.about_page_subscribe_text_container}>
          <p className={s.default_text}>
            <span>
              Подписывайся на канал{" "}
              <span className={s.black_text}>
                <a href={`https://t.me/unirunners`} target="_blank">
                  Unirunners{" "}
                </a>{" "}
              </span>
              и будь в курсе событий проекта! ()
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
