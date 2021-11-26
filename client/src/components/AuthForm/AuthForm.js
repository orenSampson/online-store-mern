import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../../store/auth/actions";

function AuthForm() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loadingReducers.isLoading);
  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const logoutHandler = () => {
    dispatch(authActions.auth_logout());
  };

  const switchAuthModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      authActions.auth_login_signup({
        isLoginMode,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      })
    );
  };

  return (
    <div>
      <h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          {!isLoading && (
            <button>{isLoginMode ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
        </div>
        <div>
          {isLoggedin && <button onClick={logoutHandler}>Logout</button>}
        </div>
        <div>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLoginMode ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
