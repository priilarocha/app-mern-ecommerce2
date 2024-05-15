import { Grid } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import NavBar from "../components/NavBar.jsx";

const AuthPage = () => {
  const [loginShow, setLoginShow] = useState(true);

  const handleSignup = () => {
    setLoginShow(!loginShow);
  };

  return (
    <>
      <NavBar />

      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
        gap={5}
        style={{ paddingTop: "50px" }}
      >
        <Grid item>
          {loginShow ? (
            <LoginForm showSignup={handleSignup} />
          ) : (
            <RegisterForm showSignup={handleSignup} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AuthPage;