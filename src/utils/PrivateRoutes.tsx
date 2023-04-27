import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { useAuthMutation } from "../api/user/userApi";
import { setUser } from "../store/features/userSlice";
import { addAuth } from "../store/features/authSlice";

const PrivateRoutes = () => {
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector(state => state.auth.isAuth);
  const navigate = useNavigate();
  const [auth] = useAuthMutation();
  useEffect(() => {
    async function authOrNot() {
      try {
        const data = await auth().unwrap();
        dispatch(setUser({ ...data.user }));
        dispatch(addAuth());
        navigate("/");
      } catch (err) {}
    }

    if (!authenticated) {
      authOrNot();
    }
  }, [authenticated]);
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
