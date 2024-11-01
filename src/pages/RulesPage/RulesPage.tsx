import { useKeycloak } from "@react-keycloak/web";
import Button from "../../components/Button/Button";
import s from "./RulesPage.module.css";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../../store";
import { openPacerConnection } from "../../features/user/User";

const RulesPage = () => {
  const { keycloak } = useKeycloak();
  const dispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.user);

  const onPacerConnect = () => {
    dispatch(openPacerConnection());
  };

  return (
    <div className={s.rules_page_container}>
      <div className={s.rules_page_text_container}>
        <p className={s.title}>ПРАВИЛА ПРОБЕЖЕК</p>

        <div className={s.rules_page_point_div}>
          <div className={s.rules_page_point_container}>
            <p className={s.accent_subtitle}>1.</p>
            <p className={s.accent_subtitle}>
              <span>
                Показатели пробежки нужно записывать только с помощью приложения
                Pacer и только с аккаунта, который привязан к ресерсу. Используй
                только официальное приложение Pacer.
              </span>
            </p>
          </div>
        </div>

        <div className={s.rules_page_point_div}>
          <div className={s.rules_page_point_container}>
            <p className={s.accent_subtitle}>2.</p>
            <p className={s.accent_subtitle}>
              <span>
                Выбери на главном экране режим "gps", затем "Бегать" и нажми
                "Начать" По окончании активности нажми "Финиш".
              </span>
            </p>
          </div>
        </div>

        <div className={s.rules_page_point_div}>
          <div className={s.rules_page_point_container}>
            <p className={s.accent_subtitle}>3.</p>
            <p className={s.accent_subtitle}>
              <span>
                После завершения пробежки активность автоматически подгрузится
                на ресурс в течение часа. Ты можешь совершать больше 1 пробежки
                в день, но мы засчитаем только одну, большую по расстоянию.{" "}
              </span>
            </p>
          </div>
        </div>

        <div className={s.rules_page_point_div}>
          <div className={s.rules_page_point_container}>
            <p className={s.accent_subtitle}>4.</p>
            <p className={s.accent_subtitle}>
              <span>
                Засчитываются пробежки с маршрутом от 3,1 км и темпом от 3,5
                минут на километр до 8 минут на километр. Нет необходимости
                переводить темп в скорость в км/ч, он указан в минутах на км.
              </span>
            </p>
          </div>
        </div>

        <div className={s.rules_page_point_div}>
          <div className={s.rules_page_point_container}>
            <p className={s.accent_subtitle}>5.</p>
            <p className={s.accent_subtitle}>
              <span>
                Не засчитываются пробежки: загруженные вручную, с измененной
                датой, вводом GPS-данных вручную.
              </span>
            </p>
          </div>
        </div>

        <p className={s.title}>ПРИВЯЗКА PACER</p>

        <div className={s.rules_page_point_div}>
          <div className={s.rules_page_point_container}>
            <p className={s.accent_subtitle}>1.</p>
            <p className={s.accent_subtitle}>
              <span>
                {keycloak.authenticated
                  ? "Для привязки Pacer нажмите кнопку ниже и следуйте инструкциям."
                  : "Для привязки Pacer необходимо авторизоваться."}
              </span>
            </p>
          </div>
        </div>

        {keycloak.authenticated && (
          <Button text="Привязать" onClick={onPacerConnect} />
        )}
      </div>
    </div>
  );
};

export default RulesPage;
