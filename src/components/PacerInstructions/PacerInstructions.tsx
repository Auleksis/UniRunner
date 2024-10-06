import s from "./PacerInstructions.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Link from "../Link/Link";
import { useEffect, useState } from "react";
import Error from "../Error/Error";
import keycloak from "../../Keycloak";
import { updatePaserInfo } from "../../services/api";

const PacerInstructions = () => {
  const [showPacerLinker, setShowPacerLinker] = useState<boolean>(false);

  const [clientID, setClientID] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkSignedUp = async () => {
      if (keycloak.authenticated) {
        const userdata = await keycloak.loadUserProfile();
        if (userdata.id) {
          if (!localStorage.getItem(userdata.id)) {
            setShowPacerLinker(true);
          }
        }
      }
    };

    checkSignedUp();
  }, [keycloak.authenticated]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pacerCode = urlParams.get("code");

    const addToStorage = async () => {
      if (keycloak.authenticated) {
        const clientID = sessionStorage.getItem("clientID");
        const clientSecret = sessionStorage.getItem("clientSecret");

        const userdata = await keycloak.loadUserProfile();
        if (userdata.id) {
          if (
            pacerCode &&
            !localStorage.getItem(userdata.id) &&
            clientID &&
            clientSecret
          ) {
            await updatePaserInfo(clientID, clientSecret, pacerCode);

            sessionStorage.removeItem("clientID");
            sessionStorage.removeItem("clientSecret");

            localStorage.setItem(userdata.id, "1");

            setShowPacerLinker(false);
          }
        }
      }
    };

    addToStorage();
  }, []);

  const handleGetCode = () => {
    if (clientID.length == 0 || clientSecret.length == 0) {
      setError("Заполните пожалуйста Client ID и Client Secret");
    }

    sessionStorage.setItem("clientID", clientID);
    sessionStorage.setItem("clientSecret", clientSecret);

    const origin = window.location.origin;
    const redirectPath = "/profile";
    const redirectUri = encodeURIComponent(`${origin}${redirectPath}`);
    const state = "yes";
    const authUrl = `https://developer.mypacer.com/oauth2/dialog?client_id=${clientID}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = authUrl;
  };

  return (
    <>
      {showPacerLinker && (
        <div className={s.blur_background}>
          <div className={s.linker_container}>
            <p className={`${s.title} ${s.form_title}`}>Привязка Pacer</p>
            <p className={s.default_text}>
              Для корректной работы вам необходимо привязать аккаунт Pacer.
              Следуйте инструкции ниже.
            </p>
            <hr className={s.hr_horizontal} />

            <span className={s.link_info}>
              <p className={s.default_text}>Перейдите по ссылке</p>
              <Link
                text="https://developer.mypacer.com/#/signin"
                to={"https://developer.mypacer.com/#/signin"}
                target="_blank"
              />
            </span>
            <p className={s.default_text}>
              1) Авторизуйтесь или зарегистрируйтесь.
            </p>
            <img
              className={s.image}
              src="/src/assets/instructions/sign_in.png"
            />
            <p className={s.default_text}>
              2) После авторизации сверху кликните на{" "}
              <span className={s.underline}>My App</span> и введите данные.
              Нажмите на <span className={s.underline}>Submit</span>.
            </p>
            <img
              className={s.image}
              src="/src/assets/instructions/create_app.png"
            />
            <p className={s.default_text}>
              3) Вам будет показан{" "}
              <span className={s.underline}>Client Secret</span>. Скопируйте его
              в поле ниже. Если вы закрыли окно с Client Secret, то нажмите
              Reset, чтобы получить новый. Аналогично поступите с полем{" "}
              <span className={s.underline}>Client ID</span>.
            </p>
            <img
              className={s.image}
              src="/src/assets/instructions/id_secret.png"
            />
            <Input
              label="Client ID"
              id="input_client_id"
              value={clientID}
              onChange={(e) => {
                setClientID(e.target.value);
              }}
            />
            <Input
              label="Client Secret"
              id="input_client_secret"
              type="password"
              value={clientSecret}
              onChange={(e) => {
                setClientSecret(e.target.value);
              }}
            />

            {error.length != 0 && <Error text={error} />}

            <Button
              text="Завершить привязку"
              fullWidth
              onClick={handleGetCode}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PacerInstructions;
