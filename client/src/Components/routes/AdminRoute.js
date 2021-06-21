import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingTimerTOUnAuthUser from "./LoadingTimerTOUnAuthUser";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERROR", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Route {...rest} />
  ) : (
    <LoadingTimerTOUnAuthUser />
  );
};

export default AdminRoute;
