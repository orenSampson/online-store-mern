import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";

import EmailTextField from "./EmailTextField/EmailTextField";
import PasswordTextField from "./PasswordTextField/PasswordTextField";
import * as messages from "../../constants/messages";
import { loginSignup } from "../../store/auth/actions";

const styles = {
  AuthForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  PasswordField: {
    marginBottom: "1rem",
  },

  SubmitButton: {
    marginBottom: "1rem",
  },

  mandatory: {
    color: "red",
  },
};

function AuthForm(props) {
  const dispatch = useDispatch();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const email = useSelector((state) => state.authReducers.email);
  const emailError = useSelector((state) => state.authReducers.emailError);

  const password = useSelector((state) => state.authReducers.password);
  const passwordError = useSelector(
    (state) => state.authReducers.passwordError
  );

  const isLoading = useSelector((state) => state.loadingReducers.isLoading);

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
      loginSignup({
        isLoginMode,
        email,
        password,
      })
    );
  };

  styles.AuthForm = {
    ...styles.AuthForm,
    ...(props.customStyle || {}),
  };

  return (
    <Box
      component="form"
      sx={styles.AuthForm}
      onSubmit={submitHandler}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h2">{isLoginMode ? "Login" : "Sign Up"}</Typography>

      <EmailTextField />

      <PasswordTextField customStyle={styles.PasswordField} />

      {!isLoading ? (
        <Button
          sx={styles.SubmitButton}
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
      ) : (
        <Typography variant="body1">Sending request...</Typography>
      )}

      <RadioGroup
        row
        value={isLoginMode ? "login" : "signup"}
        onChange={switchAuthModeHandler}
      >
        <FormControlLabel value="login" control={<Radio />} label="Login" />
        <FormControlLabel value="signup" control={<Radio />} label="Sign Up" />
      </RadioGroup>

      <Typography sx={styles.mandatory} variant="body1">
        * Mandatory fields
      </Typography>
    </Box>
  );
}

export default AuthForm;
