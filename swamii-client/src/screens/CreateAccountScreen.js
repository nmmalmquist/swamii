import React, { useState } from "react";
import { Container } from "react-bootstrap";
import * as Yup from "yup";

import styles from "../css/cssScreens/create-account-screen.module.css";

import logo from "../assets/logos/blue-logo.png";
import FormTextInput from "../components/form/FormTextInput";
import AppForm from "../components/form/AppForm";
import SubmitFormButton from "../components/form/SubmitFormButton";
import AppErrorMessage from "../components/form/FormErrorMessage";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const yupValidationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().min(1).required().label("Password"),
  confirmPassword: Yup.string().min(1).required().label("Confirmed Password"),
  email: Yup.string().email().required().label("Email"),
  firstName: Yup.string().min(1).required().label("First Name"),
  lastName: Yup.string().min(1).required().label("Last Name"),
});

function CreateAccountScreen(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordConfirmed, setPasswordConfirmed] = useState(true);
  const { createAccount } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ username, email, firstName, lastName, confirmPassword, password }) => {
    
    //Check if the password and confirm password inputs are the same
    if (password !== confirmPassword) return setPasswordConfirmed(false)
    setPasswordConfirmed(true)

    //hits back-end api to try and create a new account. Will return a user id if successful
    try {
      const user = await createAccount({
        username: username.toLowerCase(),
        password: password,
        email: email.toLowerCase(),
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase()
      });
      setErrorMessage(null);
      alert("user: " + username + " has been created!")
      navigate("/entry")
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
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
            <h2>Create a Swamii Account</h2>
            <AppForm
              initialValues={{ username: "", password: "", firstName: "", lastName: "", email: "", confirmPassword: "" }}
              onSubmit={handleSubmit}
              validationSchema={yupValidationSchema}
            >
              <Container className={styles.textInputContainer}>
                <FormTextInput
                  placeholder="First Name"
                  type="text"
                  label="First Name"
                  name="firstName"
                />
              </Container>
              <Container className={styles.textInputContainer}>
                <FormTextInput
                  placeholder="Last Name"
                  type="text"
                  label="Last Name"
                  name="lastName"
                />
              </Container>
              <Container className={styles.textInputContainer}>
                <FormTextInput
                  placeholder="Email"
                  type="email"
                  label="Email"
                  name="email"
                />
              </Container>
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
              <Container className={styles.textInputContainer}>
                <FormTextInput
                  placeholder="Password"
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                />
              </Container>
              <AppErrorMessage
                error={errorMessage ? JSON.parse(errorMessage).message : null}
                visible={errorMessage}
              />
              <AppErrorMessage
                error="The passwords do not match."
                visible={!passwordConfirmed}
              />
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

export default CreateAccountScreen;