import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import validator from "validator";

import * as messages from "../../../constants/messages";
import {
  emailSetter,
  emailReset,
  emailErrorSetter,
  emailErrorReset,
} from "../../../store/auth/actions";
import { AUTH_INITIAL_STATE } from "../../../store/auth/reducers";

let emailTimeoutID;

const styles = {
  EmailTextField: {
    width: "23rem",
  },
};

const EmailTextField = (props) => {
  const dispatch = useDispatch();

  const emailInputRef = useRef();

  const emailError = useSelector((state) => state.authReducers.emailError);

  useEffect(() => {
    return () => {
      clearTimeoutAndEmailError();

      dispatch(emailReset());
    };
  }, [dispatch]);

  const emailValidator = () => {
    if (emailInputRef.current.value === AUTH_INITIAL_STATE.email) {
      dispatch(emailErrorSetter(messages.FIELD_IS_EMPTY));
    } else {
      if (!validator.isEmail(emailInputRef.current.value)) {
        dispatch(emailErrorSetter(messages.EMAIL_NOT_VALID));
      } else {
        dispatch(emailErrorSetter(messages.FIELD_IS_OK));
      }
    }
  };

  const clearTimeoutAndEmailError = () => {
    clearTimeout(emailTimeoutID);
    emailTimeoutID = null;

    dispatch(emailErrorReset());
  };

  const checkOnChangeHandler = () => {
    dispatch(emailSetter(emailInputRef.current.value));

    clearTimeoutAndEmailError();

    emailTimeoutID = setTimeout(emailValidator, 800);
  };

  const checkOnBlurHandler = () => {
    clearTimeoutAndEmailError();

    emailValidator();
  };

  styles.EmailTextField = {
    ...styles.EmailTextField,
    ...(props.customStyle || {}),
  };

  return (
    <TextField
      sx={styles.EmailTextField}
      label="Email"
      variant="outlined"
      type="email"
      required
      onBlur={checkOnBlurHandler}
      onFocus={checkOnChangeHandler}
      onChange={checkOnChangeHandler}
      error={!!emailError && emailError !== messages.FIELD_IS_OK}
      helperText={
        emailError === messages.FIELD_IS_OK
          ? AUTH_INITIAL_STATE.emailError
          : emailError
      }
      inputRef={emailInputRef}
      margin="normal"
      color="success"
    />
  );
};

export default EmailTextField;
