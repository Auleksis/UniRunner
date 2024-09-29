import { useState } from "react";
import s from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";

function App() {
  return (
    <>
      <ReactKeycloakProvider authClient={keycloak}>
        <Layout />
      </ReactKeycloakProvider>
    </>
  );
}

export default App;
