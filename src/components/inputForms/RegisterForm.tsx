import { useState } from "react";
import { useFormik } from "formik";
import { useSignupUserMutation } from "../../api/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/features/userSlice";
import { addAuth } from "../../store/features/authSlice";
import { toast } from "react-hot-toast";
import { IKContext, IKUpload } from "imagekitio-react";
import Loader from "../Loader";
import { SignupSchema } from "../../validations/SignupSchema";
import { UploadResponse } from "../../types/imgUpload.types";
import { authenticationEndpoint, publicKey, urlEndpoint } from "../../config";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  img: string;
};

const RegisterForm = () => {
  const [signupUser, { data, isSuccess, isError, error, isLoading }] =
    useSignupUserMutation();

  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState("");
  const dispatch = useAppDispatch();
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

  const onError = (err: any) => {
    setLoading(false);
    toast.success("an error occurred while uploading an image.");
  };
  const onSuccess = (res: UploadResponse) => {
    setLoading(false);
    toast.success("image uploaded successfully");

    setSrc(res.url);
  };

  const onUploadStart = () => {
    setLoading(true);
  };

  async function onSubmit(values: FormValues) {
    if (!src) {
      toast.error("Please upload profile picture !");
      return;
    }
    try {
      const userData = await signupUser({
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.phone,
        img: src,
      }).unwrap();

      dispatch(setUser({ ...userData.user }));
      dispatch(addAuth());
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
        <div className="flex flex-col items-center justify-center mb-4">
          {src && !loading && (
            <img
              src={src}
              alt="user photo"
              className="object-cover w-20 h-20 mb-4 border-2 rounded-full border-sky-600"
            />
          )}
          {loading && <Loader />}
          {!loading && (
            <IKContext
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticationEndpoint={authenticationEndpoint}
            >
              {/* <p>Upload an image</p> */}
              <label htmlFor="imageOfUser" className="cursor-pointer">
                + Photo
              </label>
              <IKUpload
                fileName="user.png"
                onError={onError}
                onSuccess={onSuccess}
                id="imageOfUser"
                name="img"
                data-max-size="2048"
                type="file"
                validateFile={file => {
                  if (
                    file.size < 2 * 1024 * 1024 &&
                    /[^\s]+(.*?).(jpg|png)$/i.test(file.name)
                  ) {
                    return true;
                  }
                  toast.error(
                    "Image should be less than 2 mb with jpg and png extension"
                  );
                  return false;
                }}
                onUploadStart={onUploadStart}
              />
            </IKContext>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-antiquewhite"
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
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="phone"
          >
            PhoneNo
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-antiquewhite"
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
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-antiquewhite"
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
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-antiquewhite"
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
        <button type="submit" className="p-2 m-2 text-white rounded bg-sky-600">
          Submit
        </button>
        <button type="reset" className="p-2 m-2 text-white bg-red-600 rounded">
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

export default RegisterForm;
