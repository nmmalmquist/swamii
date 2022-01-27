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
import AppBanner from "../components/generic/AppBanner";
import NeonLogo from "../components/NeonLogo";

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
  const [bannerIsVisible, setBannerIsVisible] = useState(false);
  const { userCreateAccount } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({
    username,
    email,
    firstName,
    lastName,
    confirmPassword,
    password,
  }) => {
    //Check if the password and confirm password inputs are the same
    if (password !== confirmPassword) return setPasswordConfirmed(false);
    setPasswordConfirmed(true);

    //hits back-end api to try and create a new account. Will return a user id if successful
    try {
      const user = await userCreateAccount({
        username: username.toLowerCase(),
        password: password,
        email: email.toLowerCase(),
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      });
      setErrorMessage(null);
      //make created account banner visible
      setBannerIsVisible(true);
      //after 2 seconds, return to main entry page
      setTimeout(() => navigate("/entry"), 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };
  return (
    <>
      <AppBanner
        visible={bannerIsVisible}
        primaryColor="rgb(66, 114, 66)"
        secondaryColor="white"
        text="New Account Created!"
      />
      <Container
        fluid
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className={styles.logoContainer}
      >
        <div className={styles.logo}>
          <NeonLogo
            backgroundColor={"black"}
            fontSize={45}
            onClick={() => navigate("/entry")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </Container>
      <Container
        fluid
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className={styles.mainContainer}
      >
        <div className={styles.contentContainerBackground}>
          <div className={styles.contentContainer}>
            <h2>Create a Swamii Account</h2>
            <AppForm
              initialValues={{
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
                confirmPassword: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={yupValidationSchema}
            >
              <form>
                <div className={styles.textInputContainer}>
                  <FormTextInput
                    placeholder="First Name"
                    type="text"
                    label="First Name"
                    name="firstName"
                  />
                </div>
                <div className={styles.textInputContainer}>
                  <FormTextInput
                    placeholder="Last Name"
                    type="text"
                    label="Last Name"
                    name="lastName"
                  />
                </div>
                <div className={styles.textInputContainer}>
                  <FormTextInput
                    placeholder="Email"
                    type="email"
                    label="Email"
                    name="email"
                  />
                </div>
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
                <div className={styles.textInputContainer}>
                  <FormTextInput
                    placeholder="Password"
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                  />
                </div>
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
              </form>
            </AppForm>
          </div>
        </div>
      </Container>
    </>
  );
}

export default CreateAccountScreen;
