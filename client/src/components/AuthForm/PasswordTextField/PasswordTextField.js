import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";

import * as messages from "../../../constants/messages";
import {
  authPasswordSetter,
  authPasswordReset,
  authPasswordErrorSetter,
  authPasswordErrorReset,
} from "../../../store/auth/actions";
import { AUTH_INITIAL_STATE } from "../../../store/auth/reducers";
import * as loginSignupConsts from "../../../constants/loginSignup";

let passwordTimeoutID = null;

const styles = {
  PasswordTextField: {
    width: "23rem",
  },
};

const PasswordTextField = (props) => {
  const dispatch = useDispatch();

  const passwordInputRef = useRef();

  const passwordError = useSelector(
    (state) => state.authReducers.passwordError
  );

  useEffect(() => {
    return () => {
      clearTimeoutAndPasswordError();

      dispatch(authPasswordReset());
    };
  }, [dispatch]);

  const passwordValidator = () => {
    if (
      passwordInputRef.current.value.length ===
      AUTH_INITIAL_STATE.password.length
    ) {
      dispatch(authPasswordErrorSetter(messages.FIELD_IS_EMPTY));
    } else {
      if (
        passwordInputRef.current.value.length <
        loginSignupConsts.PASSWORD_MIN_LENGTH
      ) {
        dispatch(authPasswordErrorSetter(messages.PASSWORD_NOT_VALID));
      } else {
        dispatch(authPasswordErrorSetter(messages.FIELD_IS_OK));
      }
    }
  };

  const clearTimeoutAndPasswordError = () => {
    clearTimeout(passwordTimeoutID);
    passwordTimeoutID = null;

    dispatch(authPasswordErrorReset());
  };

  const checkOnChangeHandler = () => {
    dispatch(authPasswordSetter(passwordInputRef.current.value));

    clearTimeoutAndPasswordError();

    passwordTimeoutID = setTimeout(passwordValidator, 800);
  };

  const checkOnBlurHandler = () => {
    clearTimeoutAndPasswordError();

    passwordValidator();
  };

  styles.PasswordTextField = {
    ...styles.PasswordTextField,
    ...(props.customStyle || {}),
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
      error={!!passwordError && passwordError !== messages.FIELD_IS_OK}
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
