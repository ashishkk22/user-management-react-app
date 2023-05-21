import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../api/user/userApi";
import { SignInSchema } from "../../validations/SignInSchema";
import InputField from "./InputField";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit,
  });

  async function onSubmit(values: FormValues) {
    try {
      await loginUser({
        email: values.email,
        password: values.password,
      }).unwrap();
      navigate("/");
    } catch (err: any) {
      toast.error(err.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        onReset={() => formik.resetForm()}
        className="w-10/12"
      >
        <h1 className="self-start mb-6 text-5xl font-semibold">Login</h1>
        <InputField
          LabelTitle="Email"
          type="text"
          id="email"
          placeholder="Enter the email id"
          {...formik.getFieldProps("email")}
          error={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""
          }
        />
        <InputField
          LabelTitle="Password"
          id="password"
          type="password"
          autoComplete="on"
          placeholder="Enter the password"
          {...formik.getFieldProps("password")}
          error={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""
          }
        />
        <button type="submit" className="p-2 m-2 text-white rounded bg-sky-600">
          Submit
        </button>
        <button type="reset" className="p-2 m-2 text-white bg-red-600 rounded">
          Reset
        </button>
      </form>
      <div>
        Don't have an account ?{" "}
        <Link to="/auth/register" className="text-sky-600">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
