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
          <p className={s.accent_subtitle}>
            Мы любим бег. Мы не ограничены материальными, временными и
            пространственными ресурсами. Нам нужны только кроссовки. Мы -
            <a href={`https://t.me/unirunners`} target="_blank">
              {" "}
              сообщество студентов{" "}
            </a>{" "}
            из Санкт-Петербурга, и мы влюблены в пробежки.
          </p>
          <Runner className={s.svg_mark} />
        </div>

        <div className={s.about_page_svg_marked_text}>
          <Question className={s.svg_mark} />
          <p className={s.accent_subtitle}>
            Хочешь пробежать свои первые 3 км по парку, либо делаешь недельные
            объемы для подготовки к марафонам?
          </p>
        </div>

        <div className={s.about_page_svg_marked_text}>
          <p className={s.accent_subtitle}>
            <span className={s.black_text}>
              <a href="#" onClick={() => keycloak.login()}>
                Присоединяйся
              </a>{" "}
              к проекту и находи единомышленников в своём университете. Выходи
              на тренировку и собирай километры в{" "}
              <Link to={"/ratings/"}> общий рейтинг </Link> альма-матер.
            </span>
          </p>
          <Group className={s.svg_group_mark} />
        </div>
        <div className={s.about_page_svg_marked_text}>
          <Star className={s.svg_mark} />

          <p className={s.accent_subtitle}>
            Следи за статистикой в личном кабинете и совершенствуйся каждый
            день. Принимай участие в наших длительных тренировках и забегах.
            Тренируйся и становись счастливее.
          </p>
        </div>
        <Button
          fontSize={"2.25rem"}
          text="Присоединиться!"
          onClick={() => keycloak.login()}
        />
        <p className={s.default_text}>
          Для учёта пробежек мы используем{" "}
          <a href="https://www.mypacer.com/" target="_blank">
            приложение Pacer
          </a>
          . Ты можешь установить его на свой смартфон и включать трек на
          пробежке, либо продолжать использовать свой любимый трекер и настроить
          выгрузку в Pacer. Минимальная дистанция для учёта - 3 км. Средний темп
          от 4.00 до 08.00 мин./км.
        </p>

        <div className={s.about_page_subscribe_text_container}>
          <p className={s.accent_subtitle}>
            <span className={s.black_text}>
              Подписывайся на канал{" "}
              <a href={`https://t.me/unirunners`} target="_blank">
                Unirunners{" "}
              </a>{" "}
              и будь в курсе событий проекта!
            </span>
          </p>
        </div>
      </div>

      <div className={s.about_page_text_container}>
        <p className={s.title}>ЦЕЛИ ПРОЕКТА</p>
        <div className={s.page_point_div}>
          <div className={s.page_point_container}>
            <p className={s.accent_subtitle}>1.</p>
            <p className={s.accent_subtitle}>
              Формирование бегового студенческого сообщества Санкт-Петербурга
            </p>
            <p className={s.accent_subtitle}>2.</p>
            <p className={s.accent_subtitle}>
              Вовлечение в бег студентов Санкт-Петербурга
            </p>
            <p className={s.accent_subtitle}>3.</p>
            <p className={s.accent_subtitle}>
              Создание беговых сообществ в вузах СПб
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
