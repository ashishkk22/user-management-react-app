import React, { ReactNode } from "react";
type LayoutAuthProps = {
  children: ReactNode;
};
const LayoutAuth: React.FC<LayoutAuthProps> = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 ">{children}</div>
      <div className="hidden items-center justify-center w-full sm:w-1/2 sm:flex">
        <img
          src="/assets/signup-banner.png"
          alt="sign-up banner"
          className="w-10/12 m-4 h-10/12 xl:w-9/12 xl:h-9/12"
        />
      </div>
    </div>
  );
};

export default LayoutAuth;
