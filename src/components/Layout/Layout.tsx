import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import s from "./Layout.module.css";
import { useKeycloak } from "@react-keycloak/web";
import PacerInstructions from "../PacerInstructions/PacerInstructions";
import { useEffect } from "react";

const Layout = () => {
  const { initialized } = useKeycloak();

  useEffect(() => {
    console.log("MODE");
    console.log(import.meta.env.VITE_REACT_APP_API_ENDPOINT);
  }, []);

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
