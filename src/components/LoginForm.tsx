import React, { FormEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "../api/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/features/userSlice";
import { addAuth } from "../store/features/authSlice";

type FormValues = {
  email: string;
  password: string;
};

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required !"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is required !"),
});

const LoginForm = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmit(values: FormValues) {
    try {
      const userData = await loginUser({
        email: values.email,
        password: values.password,
      }).unwrap();
      console.log(userData);
      dispatch(setUser({ ...userData.user }));
      dispatch(addAuth());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  return (
    <div className="flex flex-col justify-center  items-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        onReset={() => formik.resetForm()}
        className="w-10/12"
      >
        <h1 className="self-start mb-6 text-5xl font-semibold">Login</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-antiquewhite"
            type="text"
            id="email"
            placeholder="Enter the email id"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-antiquewhite"
            id="password"
            type="password"
            name="password"
            placeholder="Enter the password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="rounded p-2 bg-sky-600	 m-2 text-white">
          Submit
        </button>
        <button type="reset" className="rounded p-2 bg-red-600 m-2 text-white">
          Reset
        </button>
      </form>
      <div>
        Don't have an account ?{" "}
        <Link to="/register" className="text-sky-600">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
