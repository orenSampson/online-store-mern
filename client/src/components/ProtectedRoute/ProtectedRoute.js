import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAllowed) {
          return <Component />;
        }

        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
