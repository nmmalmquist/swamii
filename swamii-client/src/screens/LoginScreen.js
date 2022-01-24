import React, { useState } from "react";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from "../css/cssScreens/login-screen.module.css";

import logo from "../assets/logos/blue-logo.png";
import FormTextInput from "../components/form/FormTextInput";
import AppForm from "../components/form/AppForm";
import SubmitFormButton from "../components/form/SubmitFormButton";
import { validateUser } from "../api/auth";
import AppErrorMessage from "../components/form/FormErrorMessage";
import useAuth from "../auth/useAuth";
import NeonLogo from "../components/NeonLogo";

const yupValidationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().min(1).required().label("Password"),
});

function LoginScreen(props) {
  const [validCredentials, setValidCredentials] = useState(true);
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ username, password }) => {
    //validation in backend
    try {
      const token = await validateUser({
        username: username.toLowerCase(),
        password: password,
      });
      //stores token in localStorage
      userLogin(token);

      setValidCredentials(true);
      //go to home page
      navigate("/");
    } catch (error) {
      console.log(error);
      setValidCredentials(false);
    }
  };
  return (
    <>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <NeonLogo
            backgroundColor={"black"}
            fontSize={45}
            onClick={() => navigate("/entry")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <Container
        fluid
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className={styles.mainContainer}
      >
        <div className={styles.contentContainerBackground}>
          <div className={styles.contentContainer}>
            <h2>Log in to your account</h2>
            <AppForm
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={yupValidationSchema}
            >
              <div className={styles.textInputContainer}>
                <FormTextInput
                  placeholder="Username"
                  type="text"
                  label="Username"
                  name="username"
                />
              </div>
              <div className={styles.textInputContainer}>
                <FormTextInput
                  placeholder="Password"
                  type="password"
                  label="Password"
                  name="password"
                />
              </div>
              <AppErrorMessage
                error="The password or username is incorrect"
                visible={!validCredentials}
              />
              <SubmitFormButton
                title="Log in"
                extraStyle={styles.submitButton}
              />
            </AppForm>
          </div>
        </div>
      </Container>
    </>
  );
}

export default LoginScreen;
