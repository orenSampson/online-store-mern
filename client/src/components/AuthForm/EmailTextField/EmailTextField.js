import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import validator from "validator";

import * as messages from "../../../constants/messages";
import styles from "./EmailTextField.module.scss";

let emailTimeoutID;

const EmailTextField = (props) => {
  const emailInputRef = useRef();

  useEffect(() => {
    return () => {
      clearTimeoutAndEmailError();
    };
  });

  const emailValidator = () => {
    if (emailInputRef.current.value === "") {
      props.setEmailError(messages.FIELD_IS_EMPTY);
    } else {
      if (!validator.isEmail(emailInputRef.current.value)) {
        props.setEmailError(messages.EMAIL_NOT_VALID);
      } else {
        props.setEmailError(messages.FIELD_IS_OK);
      }
    }
  };

  const clearTimeoutAndEmailError = () => {
    clearTimeout(emailTimeoutID);
    emailTimeoutID = null;

    props.setEmailError(null);
  };

  const checkOnChangeHandler = () => {
    props.setEmail(emailInputRef.current.value);

    clearTimeoutAndEmailError();

    emailTimeoutID = setTimeout(emailValidator, 800);
  };

  const checkOnBlurHandler = () => {
    clearTimeoutAndEmailError();

    emailValidator();
  };

  return (
    <TextField
      className={styles.EmailTextField}
      label="Email"
      variant="outlined"
      type="email"
      required
      onBlur={checkOnBlurHandler}
      onFocus={checkOnChangeHandler}
      onChange={checkOnChangeHandler}
      error={!!props.emailError && props.emailError !== messages.FIELD_IS_OK}
      helperText={
        props.emailError === messages.FIELD_IS_OK ? "" : props.emailError
      }
      inputRef={emailInputRef}
      defaultValue={props.email}
      margin="normal"
      color="success"
    />
  );
};

export default EmailTextField;
