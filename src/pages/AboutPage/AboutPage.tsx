import { useKeycloak } from "@react-keycloak/web";
import Button from "../../components/Button/Button";
import s from "./AboutPage.module.css";

const AboutPage = () => {
  const { keycloak } = useKeycloak();
  return (
    <div>
      <div className={s.about_page_intro_div}>
        <div className={s.about_page_intro_text_div}>
          <p className={s.accent_subtitle}>
            Бег – это самый доступный способ беговой тренировки, не ограниченный
            ни материальными, ни временными, ни пространственными ресурсами.
            Достаточно просто выйти из дома и начать бежать.
          </p>
        </div>
        <span className={s.black_title}>
          <p className={s.accent_subtitle}>Ценности</p>
        </span>
        <div className={s.about_page_values_div}>
          <p className={s.accent_subtitle}>Практическая ценность</p>
          <p className={s.accent_subtitle}>Образовательная ценность</p>
          <p className={s.accent_subtitle}>Социальная ценность</p>
        </div>
        <span className={s.black_title}>
          <p className={s.accent_subtitle}>
            Если ты любишь бег также, как мы, то присоединяйся
          </p>
        </span>
        {keycloak.authenticated ? (
          <div className={s.about_page_congratulations_div}>
            <p className={s.accent_subtitle}>
              {"Поздравляем! Ты уже с нами :-)"}
            </p>
          </div>
        ) : (
          <Button text="Зарегистрироваться!" onClick={() => keycloak.login()} />
        )}
      </div>
    </div>
  );
};

export default AboutPage;
