import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
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
});
