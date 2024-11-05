import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_REACT_APP_KEYCLOAK_NEW_ENDPOINT,
  realm: "running-community",
  clientId: "React-auth",
});

export default keycloak;
