import Keycloak from "keycloak-js";

// const keycloak = new Keycloak({
//   url: "http://localhost:8083/",
//   realm: "running-community",
//   clientId: "React-auth",
// });

const keycloak = new Keycloak({
  url: "https://running.kronbars.ru:8443/",
  realm: "running-community",
  clientId: "React-auth",
});

export default keycloak;
