import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

const LayoutAuth = () => {
  //if already logged in redirect to dashboard
  const authenticated = useAppSelector(state => state.auth.isAuth);
  if (authenticated) return <Navigate to={"/"} />;

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 ">
          <Outlet />
        </div>
        <div className="items-center justify-center hidden w-full sm:w-1/2 sm:flex">
          <img
            src="/assets/signup-banner.png"
            alt="sign-up banner"
            className="w-10/12 m-4 h-10/12 xl:w-9/12 xl:h-9/12"
          />
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
