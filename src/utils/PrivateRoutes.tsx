import { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useAuthMutation } from "../api/user/userApi";

const PrivateRoutes = () => {
  const authenticated = useAppSelector(state => state.auth.isAuth);
  const navigate = useNavigate();
  const [auth] = useAuthMutation();
  useEffect(() => {
    async function authOrNot() {
      try {
        await auth().unwrap();
        navigate("/");
      } catch (err) {}
    }

    if (!authenticated) {
      authOrNot();
    }
  }, [authenticated]);
  return authenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
