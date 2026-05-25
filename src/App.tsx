import { Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login";
import SignUp from "./assets/pages/SignUp";
import Home from "./assets/pages/Home";
import PasswordReset from "./assets/pages/PasswordReset";

function App() {
  return (
    <>
      {/* Routing flow 
    Landing page : /login -? password not correct > Sign up or Forgot password
    Sign up page : /signup -? sign up successful > login page
    Forgot password page : /forgot-password -? email sent > login page
    Landing page -> /dashboard(if details are correct) /dashboard -> /login(if user logs out)
     */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
