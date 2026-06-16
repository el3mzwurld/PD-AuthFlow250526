// images and icons
import logo from "../images/logo.svg";
import loginIllustration from "../images/Login-Illustration.svg";
import logoAlt from "../images/logoipsum-custom-logo.svg";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
// components and libraries
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginValidator } from "../form-validation/validation.all";
const initialValues = {
  email: "",
  password: "",
};

const formFieldStyles = {
  width: "100%",
  height: "40px",
  borderRadius: "4px",
  border: "1px solid grey",
  padding: "5px 15px",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLandingPageRedirect = () => {
    navigate("/");
  };

  const userSubmitHandler = (
    values: { email: string; password: string },
    {
      setFieldError,
      setStatus,
    }: {
      setFieldError: (field: string, message: string) => void;
      setStatus: (status: string | null) => void;
    },
  ) => {
    // check if localstorage is empty, if so, throw Error and throw error to sign up first
    if (localStorage.length === 0) {
      setFieldError("email", "Please sign up first to log in.");
      console.error("LocalStorage is empty:", localStorage);
      return;
    }
    // if it isn't empty, check if the email exists
    if (localStorage.getItem(values.email) === null) {
      setFieldError("email", "No user Found. Please sign up first.");
      console.error("User not found:", values.email, localStorage);

      return;
    }
    // if email exists, check if the password is correct
    const storedUser = JSON.parse(localStorage.getItem(values.email) || "{}");
    console.log(storedUser);
    if (storedUser.password !== values.password) {
      setFieldError(
        "password",
        "Invalid details, please check if the details provided were correct.",
      );
      console.error("Invalid password for user:", values.email);
      return;
    }

    setStatus(null);
    navigate("/dashboard", {
      state: { email: values.email, name: storedUser.fName },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      className="login"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* Main form box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: "100%", lg: "45%" },
          height: "100%",
          padding: { xs: theme.spacing(2), lg: theme.spacing(3.5) },
          backgroundColor: "background.paper",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Stack
          component={motion.div}
          sx={{
            width: "70%",
            height: "auto",
            alignItems: "center",
            gap: 2,
            marginBottom: 3,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* logo */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(0.5),
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 35,
                height: "auto",
                marginRight: 5,
              }}
            />
            <Typography
              variant="h4"
              sx={{ fontFamily: theme.typography.fontFamily }}
            >
              SleekNote.
            </Typography>
          </span>

          {/* Header */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              fontFamily: theme.typography.altFont,
              "::selection": {
                backgroundColor: "transparent",
              },
            }}
          >
            Welcome Back
          </Typography>
        </Stack>

        {/* Form */}
        <Box
          sx={{
            width: { xs: "75%", lg: "300px" },
            height: { xs: "250px", lg: "310px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid",
            marginBottom: theme.spacing(3),
            borderColor: theme.palette.divider,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidator}
            onSubmit={(values, { setFieldError, setStatus }) =>
              userSubmitHandler(values, { setFieldError, setStatus })
            }
          >
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(1.5),
                width: "100%",
                height: "100%",
              }}
            >
              <Stack spacing={0.5}>
                <label htmlFor="email">
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: 1,
                      fontFamily: theme.typography.altFont,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    Email Address
                  </Typography>
                </label>
                <Field
                  name="email"
                  placeholder="Email"
                  style={formFieldStyles}
                ></Field>
                <ErrorMessage name="email" component={"p"} />
              </Stack>
              <Stack spacing={0.5}>
                <label htmlFor="password">
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: 1,
                      fontFamily: theme.typography.altFont,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    Password
                  </Typography>
                </label>

                <Box sx={{ position: "relative", width: "100%" }}>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    style={{ ...formFieldStyles }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: 10,
                      opacity: 0.6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaRegEyeSlash size={16} />
                    ) : (
                      <FaRegEye size={16} />
                    )}
                  </span>
                </Box>

                <ErrorMessage name="password" component={"p"} />
              </Stack>
              <Stack
                direction={"row"}
                sx={{
                  height: "30px",
                  paddingY: "2.5px",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(0.5),
                    fontSize: "8px",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      height: "100%",
                      accentColor: theme.palette.primary.main,
                    }}
                  ></input>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Stay Logged in
                  </Typography>
                </span>

                <Link
                  to={"/forgot-password"}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </Stack>
              <Button
                type="submit"
                variant="contained"
                sx={{ ":hover": { backgroundColor: theme.palette.light } }}
              >
                Login
              </Button>
            </Form>
          </Formik>
        </Box>

        {/* sign up link */}
        <Typography variant="body2" sx={{ marginY: 0.8 }}>
          Don't have an account?{" "}
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
      {/* Illustration and page info */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          position: "relative",
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "background.authSide",
          zIndex: 0,
        }}
      >
        {/* Illustration container */}

        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
            opacity: 0.6,
            transition: "opacity 0.3s ease",

            ":hover": {
              opacity: 0.9,
            },
          }}
          animate={{ scale: [null, 0.9, 1.1, 1] }}
        >
          <img
            src={loginIllustration}
            alt="Login Illustration"
            style={{
              width: 560,
              height: 560,
              position: "absolute",
              bottom: -50,
            }}
          />
        </Box>

        <Box
          sx={{
            zIndex: 1,
            position: "absolute",
            width: "45%",
            height: "150px",
            top: 10,
            right: 5,
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
            alignItems: "flex-end",
            justifyContent: "center",
            paddingX: 3,
            paddingY: 2,
          }}
        >
          {/* logo + company name */}
          <span style={{ display: "flex" }}>
            <img
              src={logoAlt}
              alt="Logo"
              style={{
                width: 30,
                height: "auto",
                marginRight: 5,
              }}
            />
            <Typography
              variant="h4"
              sx={{ fontFamily: theme.typography.fontFamily }}
            >
              SleekNote.
            </Typography>
          </span>
          {/* what we do */}
          <Typography
            variant="caption"
            sx={{
              fontFamily: theme.typography.fontFamily,
              textAlign: "right",
              color: "text.secondary",
            }}
          >
            We have tips and tools to keep your business growing while you're
            out of the office.
          </Typography>
          {/* button to direct user to landing page that doesn't really exist */}
          <Button
            variant="outlined"
            sx={{
              borderColor: "secondary.contrastText",
              borderWidth: 2,
              color: "secondary.contrastText",
            }}
            onClick={handleLandingPageRedirect}
          >
            Start with SleekNote
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
