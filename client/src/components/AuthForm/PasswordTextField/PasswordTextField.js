import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";

import * as messages from "../../../constants/messages";
import * as authActions from "../../../store/auth/actions";
import { AUTH_INITIAL_STATE } from "../../../store/auth/reducers";
import * as loginSignupConsts from "../../../constants/loginSignup";

let passwordTimeoutID = null;

const styles = {
  PasswordTextField: {
    width: "23rem",
  },
};

const PasswordTextField = () => {
  const dispatch = useDispatch();

  const passwordInputRef = useRef();

  const passwordError = useSelector(
    (state) => state.authReducers.passwordError
  );

  useEffect(() => {
    return () => {
      clearTimeoutAndPasswordError();

      dispatch(authActions.auth_password_reset());
    };
  }, [dispatch]);

  const passwordValidator = () => {
    if (
      passwordInputRef.current.value.length ===
      AUTH_INITIAL_STATE.password.length
    ) {
      dispatch(authActions.auth_passwordError_setter(messages.FIELD_IS_EMPTY));
    } else {
      if (
        passwordInputRef.current.value.length <
        loginSignupConsts.PASSWORD_MIN_LENGTH
      ) {
        dispatch(
          authActions.auth_passwordError_setter(messages.PASSWORD_NOT_VALID)
        );
      } else {
        dispatch(authActions.auth_passwordError_setter(messages.FIELD_IS_OK));
      }
    }
  };

  const clearTimeoutAndPasswordError = () => {
    clearTimeout(passwordTimeoutID);
    passwordTimeoutID = null;

    dispatch(authActions.auth_passwordError_reset());
  };

  const checkOnChangeHandler = () => {
    dispatch(authActions.auth_password_setter(passwordInputRef.current.value));

    clearTimeoutAndPasswordError();

    passwordTimeoutID = setTimeout(passwordValidator, 800);
  };

  const checkOnBlurHandler = () => {
    clearTimeoutAndPasswordError();

    passwordValidator();
  };

  return (
    <TextField
      sx={styles.PasswordTextField}
      label="Password"
      variant="outlined"
      type="password"
      required
      onBlur={checkOnBlurHandler}
      onFocus={checkOnChangeHandler}
      onChange={checkOnChangeHandler}
      error={passwordError && passwordError !== messages.FIELD_IS_OK}
      helperText={
        passwordError === messages.FIELD_IS_OK
          ? AUTH_INITIAL_STATE.passwordError
          : passwordError
      }
      inputRef={passwordInputRef}
      margin="normal"
      color="success"
    />
  );
};

export default PasswordTextField;
