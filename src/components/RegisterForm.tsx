import React, { FormEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignupUserMutation } from "../api/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/features/userSlice";
import { addAuth } from "../store/features/authSlice";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // image: File | null;
};

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("User name is required !"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required !"),
  phone: Yup.string()
    .matches(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, "Invalid phone number")
    .required("Phone number is required !"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is required !"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Confirm password must match with above password !"
    )
    .required("Confirm password is required !"),
  // image: Yup.mixed()
  //   .test("fileFormat", "Unsupported file format", value =>
  //     value ? ["image/jpeg", "image/png"].includes((value as File).type) : true
  //   )
  //   .test(
  //     "fileSize",
  //     "File size too large",
  //     value => value && (value as File).size <= 2000000
  //   )
  //   .required("Required"),
});

const Register = () => {
  const [signupUser, { data, isSuccess, isError, error }] =
    useSignupUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function onSubmit(values: FormValues) {
    try {
      const userData = await signupUser({
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.phone,
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
      name: "",
      email: "",
      phone: "+91",
      password: "",
      confirmPassword: "",
      // image: null,
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
            name="image"
            className="hidden"
            accept=".jpg,.png"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // value={formik.values.image}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-antiquewhite"
            type="text"
            id="name"
            name="name"
            placeholder="Enter the name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
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
            htmlFor="phone"
          >
            PhoneNo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-antiquewhite"
            type="text"
            id="phone"
            placeholder="Enter the phone number"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div>{formik.errors.phone}</div>
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-antiquewhite"
            id="confirmPassword"
            type="password"
            placeholder="Confirm the password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
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
        Already have an account ?{" "}
        <Link to="/login" className="text-sky-600">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
