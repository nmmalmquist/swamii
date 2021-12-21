import React, { useState } from "react";
import { Container } from "react-bootstrap";
import * as Yup from "yup";

import styles from "../css/cssScreens/login-screen.module.css";

import logo from "../assets/logos/blue-logo.png";
import FormTextInput from "../components/form/FormTextInput";
import AppForm from "../components/form/AppForm";
import SubmitFormButton from "../components/form/SubmitFormButton";
import { validateUser } from "../api/auth";
import AppErrorMessage from "../components/form/FormErrorMessage";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const yupValidationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().min(1).required().label("Password"),
});

function LoginScreen(props) {
  const [validCredentials, setValidCredentials] = useState(true);
  const {userLogin} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ username, password }) => {
    //validation in backend
    try {
      const token = await validateUser({
        username: username.toLowerCase(),
        password: password,
      });
      //stores token in localStorage
      userLogin(token)

      setValidCredentials(true)
      //go to home page
      navigate("/")
    } catch (error) {
        console.log(error);
        setValidCredentials(false)
    }
  };
  return (
    <>
      <Container className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="logo" />
      </Container>
      <Container className={styles.mainContainer}>
        <Container className={styles.contentContainerBackground}>
          <Container className={styles.contentContainer}>
            <h2>Log in to your account</h2>
            <AppForm
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={yupValidationSchema}
            >
              <Container className={styles.textInputContainer}>
                <FormTextInput
                  placeholder="Username"
                  type="text"
                  label="Username"
                  name="username"
                />
              </Container>
              <Container className={styles.textInputContainer}>
                <FormTextInput
                  placeholder="Password"
                  type="password"
                  label="Password"
                  name="password"
                />
              </Container>
              <AppErrorMessage error="The password or username is incorrect" visible={!validCredentials}/>
              <SubmitFormButton
                title="Log in"
                extraStyle={styles.submitButton}
              />
            </AppForm>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default LoginScreen;
