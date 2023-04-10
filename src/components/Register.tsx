import React, { FormEvent } from "react";

const Register = () => {
  function formHandler(e: FormEvent) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div className="flex flex-col justify-center  items-center min-h-screen">
      <form onSubmit={formHandler} className="w-10/12">
        <h1 className="self-start mb-6 text-5xl font-semibold">SignUp</h1>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="cursor-pointer justify-center items-center flex"
          >
            Photo+
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            accept=".jpg,.png"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            placeholder="Enter the name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="email"
            placeholder="Enter the email id"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="PhoneNo"
          >
            PhoneNo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="PhoneNo"
            placeholder="Enter the phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            placeholder="Enter the password"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="text"
            placeholder="Confirm the password"
          />
        </div>
        <button type="submit" className="rounded p-2 bg-sky-600	 m-2">
          Submit
        </button>
        <button type="reset" className="rounded p-2 bg-red-600 m-2">
          Reset
        </button>
      </form>
    </div>
  );
};

export default Register;
