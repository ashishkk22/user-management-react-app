import React from "react";
import Register from "./Register";

const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 ">
        <Register />
      </div>
      <div className="w-full sm:w-1/2 flex justify-center items-center">
        <img
          src="/assets/signup-banner.png"
          alt="sign-up banner"
          className="h-10/12 w-10/12 m-4 xl:w-9/12 xl:h-9/12"
        />
      </div>
    </div>
  );
};

export default Home;
