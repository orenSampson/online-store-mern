import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import validator from "validator";

import * as messages from "../../../constants/messages";
import * as authActions from "../../../store/auth/actions";
import { AUTH_INITIAL_STATE } from "../../../store/auth/reducers";

let emailTimeoutID;

const styles = {
  EmailTextField: {
    width: "23rem",
  },
};

const EmailTextField = () => {
  const dispatch = useDispatch();

  const emailInputRef = useRef();

  const emailError = useSelector((state) => state.authReducers.emailError);

  useEffect(() => {
    return () => {
      clearTimeoutAndEmailError();

      dispatch(authActions.auth_email_reset());
    };
  }, [dispatch]);

  const emailValidator = () => {
    if (emailInputRef.current.value === AUTH_INITIAL_STATE.email) {
      dispatch(authActions.auth_emailError_setter(messages.FIELD_IS_EMPTY));
    } else {
      if (!validator.isEmail(emailInputRef.current.value)) {
        dispatch(authActions.auth_emailError_setter(messages.EMAIL_NOT_VALID));
      } else {
        dispatch(authActions.auth_emailError_setter(messages.FIELD_IS_OK));
      }
    }
  };

  const clearTimeoutAndEmailError = () => {
    clearTimeout(emailTimeoutID);
    emailTimeoutID = null;

    dispatch(authActions.auth_emailError_setter(AUTH_INITIAL_STATE.emailError));
  };

  const checkOnChangeHandler = () => {
    dispatch(authActions.auth_email_setter(emailInputRef.current.value));

    clearTimeoutAndEmailError();

    emailTimeoutID = setTimeout(emailValidator, 800);
  };

  const checkOnBlurHandler = () => {
    clearTimeoutAndEmailError();

    emailValidator();
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
      error={emailError && emailError !== messages.FIELD_IS_OK}
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
