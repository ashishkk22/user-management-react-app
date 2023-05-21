import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSignupUserMutation } from "../../api/user/userApi";
import { SignupSchema } from "../../validations/SignupSchema";
import InputField from "./InputField";
import ImageInput from "../imageInput/ImageInput";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  img: string;
};

const RegisterForm = () => {
  const [signupUser] = useSignupUserMutation();

  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "+91",
      password: "",
      confirmPassword: "",
      img: "",
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  async function onSubmit(values: FormValues) {
    if (!image) {
      toast.error("Please upload profile picture !");
      return;
    }
    try {
      await signupUser({
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.phone,
        img: image,
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
        <h1 className="self-start mb-6 text-5xl font-semibold">SignUp</h1>
        <ImageInput image={image} setImage={url => setImage(url)} />
        <InputField
          LabelTitle="Name"
          type="text"
          id="name"
          placeholder="Enter the name"
          {...formik.getFieldProps("name")}
          error={
            formik.errors.name && formik.touched.name ? formik.errors.name : ""
          }
        />
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
          LabelTitle="Phone No"
          type="text"
          id="phone"
          placeholder="Enter the phone number"
          {...formik.getFieldProps("phone")}
          error={
            formik.errors.phone && formik.touched.phone
              ? formik.errors.phone
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
        <InputField
          LabelTitle="Confirm Password"
          id="confirmPassword"
          type="password"
          autoComplete="on"
          placeholder="Enter the confirm password"
          {...formik.getFieldProps("confirmPassword")}
          error={
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? formik.errors.confirmPassword
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
        Already have an account ?{" "}
        <Link to="/auth/login" className="text-sky-600">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
