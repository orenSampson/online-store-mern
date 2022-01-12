import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";

import * as messages from "../../../constants/messages";
import * as loginSignupConsts from "../../../constants/loginSignup";
import styles from "./PasswordTextField.module.scss";

let passwordTimeoutID = null;

const PasswordTextField = (props) => {
  const passwordInputRef = useRef();

  useEffect(() => {
    return () => {
      clearTimeoutAndPasswordError();
    };
  });

  const passwordValidator = () => {
    if (passwordInputRef.current.value.length === 0) {
      props.setPasswordError(messages.FIELD_IS_EMPTY);
    } else {
      if (
        passwordInputRef.current.value.length <
        loginSignupConsts.PASSWORD_MIN_LENGTH
      ) {
        props.setPasswordError(messages.PASSWORD_NOT_VALID);
      } else {
        props.setPasswordError(messages.FIELD_IS_OK);
      }
    }
  };

  const clearTimeoutAndPasswordError = () => {
    clearTimeout(passwordTimeoutID);
    passwordTimeoutID = null;

    props.setPasswordError(null);
  };

  const checkOnChangeHandler = () => {
    props.setPassword(passwordInputRef.current.value);

    clearTimeoutAndPasswordError();

    passwordTimeoutID = setTimeout(passwordValidator, 800);
  };

  const checkOnBlurHandler = () => {
    clearTimeoutAndPasswordError();

    passwordValidator();
  };

  return (
    <TextField
      className={styles.PasswordTextField}
      label="Password"
      variant="outlined"
      type="password"
      required
      onBlur={checkOnBlurHandler}
      onFocus={checkOnChangeHandler}
      onChange={checkOnChangeHandler}
      error={
        !!props.passwordError && props.passwordError !== messages.FIELD_IS_OK
      }
      helperText={
        props.passwordError === messages.FIELD_IS_OK ? "" : props.passwordError
      }
      inputRef={passwordInputRef}
      defaultValue={props.password}
      margin="normal"
      color="success"
    />
  );
};

export default PasswordTextField;
