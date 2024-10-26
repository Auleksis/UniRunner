import { useKeycloak } from "@react-keycloak/web";
import Button from "../../components/Button/Button";
import s from "./AboutPage.module.css";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { keycloak } = useKeycloak();
  return (
    <div className={s.about_page_container}>
      <div className={s.about_page_intro_container}>
        <p className={s.accent_subtitle}>
          Бег – это самый доступный способ беговой тренировки, не ограниченный
          ни материальными, ни временными, ни пространственными ресурсами.
          Достаточно просто выйти из дома и начать бежать.
        </p>
      </div>
      <div className={s.about_page_text_container}>
        {keycloak.authenticated ? (
          <>
            <p className={s.title}>ПОЗДРАВЛЯЕМ</p>
            <p className={s.title}>ТЫ УЖЕ СТАЛ УЧАСТНИКОМ ПРОЕКТА UNIRUNNER</p>
          </>
        ) : (
          <>
            <p className={s.title}>ЕЩЁ НЕ С НАМИ?</p>
            <Button
              style={{ fontSize: "2rem" }}
              text="Присоединиться!"
              onClick={() => keycloak.login()}
            />
          </>
        )}
      </div>
      <div className={s.about_page_text_container}>
        <p className={s.title}>ДЛЯ ЧЕГО?</p>
        <p className={s.accent_subtitle}>
          Мы хотим развивать беговые сообщества университетов, делать вызовы и
          узнавать какой ВУЗ самый бегущий.
        </p>
      </div>
      <div className={s.about_page_text_container}>
        <p className={s.title}>КАК?</p>
        <p className={s.accent_subtitle}>
          Бегай, накручивая{" "}
          <span className={s.black_text}>
            не менее 3 километров с темпом от 4 минут на километр до 8 минут на
            километр
          </span>{" "}
          (обрати внимание, что это темп. Приложения трекеры в базовых
          настройках выводят этот показатель главным. Не нужно переводить в его
          в скорость км/час)
        </p>
      </div>
      <div className={s.about_page_text_container}>
        <p className={s.title}>ХОЧЕШЬ БОЛЬШЕ?</p>
        <p className={s.accent_subtitle}>
          Следи за своей статистикой в личном кабинете и совершенствуйся каждый
          день. Следи за статистикой участников проекта и соревнуйся с ними.
          Находи <Link to={"/events/"}> мероприятия </Link>, в которых хочешь
          принять участие и регистрируйся на них. Получай призы за достижения.
          Находи новых друзей.
        </p>
        <p className={s.accent_subtitle}>Беги и не останавливайся!</p>
      </div>
    </div>
  );
};

export default AboutPage;
