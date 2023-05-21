import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]{15,}$/, "Name must be at least 15 characters long")
    .required("Name is required"),
  email: Yup.string()
    .email("Email is invalid")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
      "Please enter valid indian phone number"
    )
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
});
