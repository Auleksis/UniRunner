import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import s from "./Layout.module.css";
import { useKeycloak } from "@react-keycloak/web";
import PacerInstructions from "../PacerInstructions/PacerInstructions";
import { useEffect } from "react";
import keycloak from "../../Keycloak";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../../store";

const Layout = () => {
  const { initialized } = useKeycloak();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (keycloak.authenticated && !localStorage.getItem(userData.id)) {
      navigate("/rules/");

      localStorage.setItem(userData.id, "1");
    }
  }, [userData]);

  if (!initialized) {
    return (
      <div className={s.layout}>
        <Header />
        <main className={s.main_container}>
          <div className={s.content_container}>
            <p className={s.default_text}>Загрузка</p>
          </div>
          <Footer />
        </main>
      </div>
    );
  }

  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main_container}>
        <div className={s.content_container}>
          <Outlet />
        </div>
        <Footer />
      </main>
      <PacerInstructions />
    </div>
  );
};

export default Layout;
