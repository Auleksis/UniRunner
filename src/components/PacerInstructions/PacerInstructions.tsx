import s from "./PacerInstructions.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Link from "../Link/Link";
import { useEffect, useState } from "react";
import Error from "../Error/Error";
import keycloak from "../../Keycloak";
import { updatePaserInfo } from "../../services/api";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../../store";
import { cleanPacerInfo, closePacerConnection } from "../../features/user/User";
import { getUserData, updateUserPacer } from "../../features/user/UserThunk";

import SignInImage from "/src/assets/instructions/sign_in.png";
import CreateAppImage from "/src/assets/instructions/create_app.png";
import IDSecretImage from "/src/assets/instructions/id_secret.png";

import Cross from "/src/assets/icons/cross.svg?react";

const PacerInstructions = () => {
  const [showPacerLinker, setShowPacerLinker] = useState<boolean>(false);

  const [clientID, setClientID] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  const fetchUserData = async () => {
    if (!userData.loaded) {
      await dispatch(getUserData());
    }
  };

  const checkSignedUp = () => {
    if (!localStorage.getItem(`${userData.id}`) && !userData.pacer_client_id) {
      setShowPacerLinker(true);
    } else {
      localStorage.setItem(`${userData.id}`, "1");
    }
  };

  const connectPacer = async (pacerCode: string) => {
    const pacerClientId = sessionStorage.getItem("clientID");
    const pacerClientSecret = sessionStorage.getItem("clientSecret");

    console.log("CONNECTING");

    if (pacerCode && pacerClientId && pacerClientSecret) {
      setShowPacerLinker(false);

      await dispatch(
        updateUserPacer({ pacerClientId, pacerClientSecret, pacerCode })
      );

      sessionStorage.removeItem("clientID");
      sessionStorage.removeItem("clientSecret");

      localStorage.setItem(`${userData.id}`, "1");
    }
  };

  useEffect(() => {
    if (userLoaded) {
      //checkSignedUp();

      if (userData.show_pacer_connection) {
        setShowPacerLinker(true);
      } else {
        setShowPacerLinker(false);
        return;
      }

      if (!userData.pacer_client_id) {
        const urlParams = new URLSearchParams(window.location.search);
        const pacerCode = urlParams.get("code");

        if (pacerCode) {
          connectPacer(pacerCode);
        }
      }
    }
  }, [userLoaded, userData.show_pacer_connection]);

  useEffect(() => {
    const load = async () => {
      if (!userData.id) {
        await fetchUserData();
      }
      setUserLoaded(true);
    };

    if (keycloak.authenticated) {
      load();
    }
  }, [keycloak.authenticated]);

  const handleGetCode = () => {
    if (clientID.length == 0 || clientSecret.length == 0) {
      setError("Заполните пожалуйста Client ID и Client Secret");
    }

    sessionStorage.setItem("clientID", clientID);
    sessionStorage.setItem("clientSecret", clientSecret);

    const origin = window.location.origin;
    const redirectPath = "/";
    const redirectUri = encodeURIComponent(`${origin}${redirectPath}`);
    const state = "yes";
    const authUrl = `https://developer.mypacer.com/oauth2/dialog?client_id=${clientID}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = authUrl;
  };

  const onCrossClicked = () => {
    dispatch(closePacerConnection());
  };

  return (
    <>
      {showPacerLinker && (
        <div className={s.blur_background}>
          <div className={s.linker_container}>
            <Cross className={s.cross_svg_div} onClick={onCrossClicked} />
            <p className={`${s.title} ${s.form_title}`}>Привязка Pacer</p>
            <p className={s.default_text}>
              Для корректной работы вам необходимо привязать аккаунт Pacer.
              Следуйте инструкции ниже.
            </p>
            <hr className={s.hr_horizontal} />

            <span className={s.link_info}>
              <p className={s.default_text}>Перейдите по ссылке</p>
              <p className={s.default_text}>
                <a
                  href={"https://developer.mypacer.com/#/signin"}
                  target="_blank"
                >
                  https://developer.mypacer.com/#/signin
                </a>
              </p>
            </span>
            <p className={s.default_text}>
              1) Авторизуйтесь или зарегистрируйтесь.
            </p>
            <img className={s.image} src={SignInImage} />
            <p className={s.default_text}>
              2) После авторизации сверху кликните на{" "}
              <span className={s.underline}>My App</span> и введите данные.
              Нажмите на <span className={s.underline}>Submit</span>.
            </p>
            <img className={s.image} src={CreateAppImage} />
            <p className={s.default_text}>
              3) Вам будет показан{" "}
              <span className={s.underline}>Client Secret</span>. Скопируйте его
              в поле ниже. Если вы закрыли окно с Client Secret, то нажмите
              Reset, чтобы получить новый. Аналогично поступите с полем{" "}
              <span className={s.underline}>Client ID</span>.
            </p>
            <img className={s.image} src={IDSecretImage} />
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
