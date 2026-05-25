// images and icons
import logo from "../images/logo.svg";
import googleIcon from "../images/google.png";
import loginIllustration from "../images/Reset password-rafiki.svg";
import logoAlt from "../images/logoipsum-custom-logo.svg";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
// components and libraries
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { forgotPassword } from "../form-validation/validation.all";
const initialValues = {
  password: "",
  cPassword: "",
};

const formFieldStyles = {
  width: "100%",
  height: "35px",
  borderRadius: 4,
  border: "1px solid grey",
  padding: "5px 15px",
};

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState({ email: email, password: "" });
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLandingPageRedirect = () => {
    navigate("/");
  };

  const checkUser = () => {
    if (!email) {
      alert("Please provide an email address");
      return;
    }
    // check localstorage for the user with the email
    if (localStorage.getItem(email) === null) {
      console.error("User doesn't exist");
      alert("This email is not valid");
      return;
    }
    const userData = JSON.parse(localStorage.getItem(email) || "{}");
    setUser(userData);
    setStep("password");
  };
  const changePassword = (key: string) => {
    setUser((prev) => {
      const updatedUser = { ...prev, password: key };
      localStorage.setItem(email, JSON.stringify(updatedUser));

      return updatedUser;
    });
    handleLandingPageRedirect();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      className="signup"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      {/* Main form box */}
      <Box
        className="form-side"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "start",
          width: { xs: "100%", lg: "45%" },
          height: "100%",
          padding: { xs: theme.spacing(2), lg: theme.spacing(3.5) },
          backgroundColor: "background.paper",
          zIndex: 1,
          overflow: "auto",
        }}
      >
        {/* Logo */}
        <Stack
          component={motion.div}
          sx={{
            width: { xs: "100%", lg: "70%" },
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
              variant="h1"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontSize: { xs: "1.5rem", lg: "2rem" },
              }}
            >
              SleekNote.
            </Typography>
          </span>

          {/* Header */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              fontFamily: theme.typography.altFont,
              textAlign: "center",
              width: "100%",
              "::selection": {
                backgroundColor: "transparent",
              },
            }}
          >
            Reset Your Password.
          </Typography>
        </Stack>

        {/* Form */}
        <Box
          sx={{
            width: { xs: "75%", lg: "345px", xl: "380px" },
            height: { xs: "250px", lg: "auto" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPassword}
            onSubmit={(values) => changePassword(values.password)}
          >
            <AnimatePresence mode="wait">
              {step === "email" ? (
                <Box
                  component={motion.div}
                  key="email"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100, width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  sx={{
                    width: "100%",
                    height: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingX: { xs: 1.5, lg: 2.25 },
                  }}
                >
                  <Form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: theme.spacing(5),
                      width: "100%",
                      height: "100%",

                      justifyContent: "center",
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
                      <input
                        name="email"
                        placeholder="Email"
                        style={formFieldStyles}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      ></input>
                    </Stack>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        ":hover": { backgroundColor: theme.palette.light },
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        checkUser();
                      }}
                    >
                      Continue
                    </Button>
                  </Form>
                </Box>
              ) : (
                <Box
                  component={motion.div}
                  key="password"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  sx={{
                    width: "100%",
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingX: { xs: 1.5, lg: 2.25 },
                  }}
                >
                  <Form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: theme.spacing(3),
                      width: "100%",
                      height: "100%",

                      justifyContent: "center",
                    }}
                  >
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

                      <ErrorMessage
                        name="password"
                        component={"p"}
                        style={{ fontSize: "12px", color: "red", opacity: 0.5 }}
                      />
                    </Stack>
                    <Stack spacing={1}>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Box sx={{ position: "relative", width: "100%" }}>
                        <Field
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
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
                      <ErrorMessage
                        name="confirmPassword"
                        component={"p"}
                        style={{
                          fontSize: "12px",
                          color: theme.palette.error.light,
                        }}
                      />
                    </Stack>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        ":hover": { backgroundColor: theme.palette.light },
                      }}
                    >
                      Continue
                    </Button>
                  </Form>
                </Box>
              )}
            </AnimatePresence>
          </Formik>
        </Box>
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
          overflow: "hidden",
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
              width: 600,
              height: 600,
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

export default PasswordReset;
