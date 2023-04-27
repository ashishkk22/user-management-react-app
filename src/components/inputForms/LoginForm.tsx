import React, { FormEvent } from "react";
import { useFormik } from "formik";
import { useLoginUserMutation } from "../../api/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/features/userSlice";
import { addAuth } from "../../store/features/authSlice";
import { toast } from "react-hot-toast";
import { SignInSchema } from "../../validations/SignInSchema";

type FormValues = {
  email: string;
  password: string;
};

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
    } catch (err: any) {
      toast.error(err.data.message);
    }
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        onReset={() => formik.resetForm()}
        className="w-10/12"
      >
        <h1 className="self-start mb-6 text-5xl font-semibold">Login</h1>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-antiquewhite"
            type="text"
            id="email"
            placeholder="Enter the email id"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-antiquewhite"
            id="password"
            type="password"
            placeholder="Enter the password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="p-2 m-2 text-white rounded bg-sky-600">
          Submit
        </button>
        <button type="reset" className="p-2 m-2 text-white bg-red-600 rounded">
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
