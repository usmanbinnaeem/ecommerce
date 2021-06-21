import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingTimerTOUnAuthUser from "./LoadingTimerTOUnAuthUser";

const AuthUserRoute = ({ ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? (
    <Route {...rest} />
  ) : (
    <LoadingTimerTOUnAuthUser />
  );
};

export default AuthUserRoute;
