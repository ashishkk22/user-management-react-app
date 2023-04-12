import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

const PrivateRoutes = () => {
  const auth = useAppSelector(state => state.auth.isAuth);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
