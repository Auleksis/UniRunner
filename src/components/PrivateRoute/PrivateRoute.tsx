import { useKeycloak } from "@react-keycloak/web";
import { ReactNode } from "react";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  //IS IT SAFE?? OR I CAN MODIFY IT IN RUNTIME IN BROWSER?
  return isLoggedIn ? props.children : null;
};

export default PrivateRoute;
