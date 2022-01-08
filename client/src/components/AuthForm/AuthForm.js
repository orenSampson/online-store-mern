import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import EmailTextField from "./EmailTextField/EmailTextField";
import PasswordTextField from "./PasswordTextField/PasswordTextField";
import * as messages from "../../constants/messages";
import * as authActions from "../../store/auth/actions";
import styles from "./AuthForm.module.scss";

function AuthForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const isLoading = useSelector((state) => state.loadingReducers.isLoading);
  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  const logoutHandler = () => {
    dispatch(authActions.auth_logout());
  };

  const switchAuthModeHandler = (event) => {
    if (event.target.value === "login") {
      setIsLoginMode(true);
    } else {
      setIsLoginMode(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      authActions.auth_login_signup({
        isLoginMode,
        email,
        password,
      })
    );
  };

  return (
    <form
      className={styles.AuthForm}
      onSubmit={submitHandler}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h2" gutterBottom>
        {isLoginMode ? "Login" : "Sign Up"}
      </Typography>

      <EmailTextField
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        setEmailError={setEmailError}
      />

      <div className={styles.PasswordField}>
        <PasswordTextField
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
        />
      </div>

      {!isLoading && (
        <Button
          className={styles.SubmitButton}
          variant="contained"
          disabled={
            !(
              emailError === messages.FIELD_IS_OK &&
              passwordError === messages.FIELD_IS_OK
            )
          }
          type="submit"
        >
          {isLoginMode ? "Login" : "Sign Up"}
        </Button>
      )}
      {isLoading && <Typography variant="body1">Sending request...</Typography>}

      {isLoggedin && (
        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
      )}

      <RadioGroup
        row
        value={isLoginMode ? "login" : "signup"}
        onChange={switchAuthModeHandler}
      >
        <FormControlLabel value="login" control={<Radio />} label="Login" />
        <FormControlLabel value="signup" control={<Radio />} label="Sign Up" />
      </RadioGroup>

      <Typography className={styles.mandatory} variant="body1">
        * Mandatory fields
      </Typography>
    </form>
  );
}

export default AuthForm;
