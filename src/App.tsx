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
