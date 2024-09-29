import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import s from "./Layout.module.css";
import { useKeycloak } from "@react-keycloak/web";

const Layout = () => {
  const { initialized } = useKeycloak();

  // if (!initialized) {
  //   return (
  //     <div className={s.layout}>
  //       <p className={s.default_text}>Загрузка</p>
  //     </div>
  //   );
  // }

  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main_container}>
        <div className={s.content_container}>
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
