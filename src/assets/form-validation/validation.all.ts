import * as Yup from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/;
export const loginValidator = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .required("Please enter your password"),
});
export const registerValidator = Yup.object({
  fName: Yup.string().required("Please enter your first name"),
  lName: Yup.string().required("Please enter your last name"),
  phone: Yup.string()
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .matches(/^\d+$/, "Phone number must contain only digits"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),

  homeAddress: Yup.string().required("Please enter your home address"),
});
export const forgotPassword = Yup.object();

// First name (no submission if fname and lname are empty)
// Last name
// Phone (only digits)
// Email (must meet basic email standards)
// Home address
// Password
// Confirm password
