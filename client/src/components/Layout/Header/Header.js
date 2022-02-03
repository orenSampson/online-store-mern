import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { Backdrop, AppBar, Toolbar, Typography, Button } from "@mui/material";

import SideBar from "../SideBar/SideBar";
import MainNav from "../MainNav/MainNav";
import * as generalActions from "../../../store/general/actions";
import * as authActions from "../../../store/auth/actions";
import { GENERAL_INITIAL_STATE } from "../../../store/general/reducers";
import { IoStorefrontOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();

  const showSideBar = useSelector((state) => state.generalReducers.showSideBar);

  const showBackDrop = useSelector(
    (state) => state.generalReducers.showBackDrop
  );

  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  const loggedInEmail = useSelector(
    (state) => state.authReducers.loggedUserEmail
  );

  const logoutHandler = () => {
    dispatch(authActions.auth_logout());
  };

  const switchShowSideBarHandler = () => {
    dispatch(generalActions.general_showSideBar_setter(!showSideBar));
    dispatch(generalActions.general_showBackDrop_setter(!showBackDrop));
  };

  const closeShowSideBarHandler = () => {
    dispatch(
      generalActions.general_showSideBar_setter(
        GENERAL_INITIAL_STATE.showSideBar
      )
    );
    dispatch(
      generalActions.general_showBackDrop_setter(
        GENERAL_INITIAL_STATE.showBackDrop
      )
    );
  };

  return (
    <Fragment>
      <AppBar elevation={0}>
        <Toolbar className={styles["main-header"]}>
          <div>
            <GiHamburgerMenu
              className={styles["main-header__burger"]}
              size={40}
              onClick={switchShowSideBarHandler}
            />
            <NavLink to="/">
              <IoStorefrontOutline
                className={styles["main-header__brand"]}
                size={40}
              />
            </NavLink>

            <Button
              variant="contained"
              color="warning"
              disableElevation
              sx={{
                display: isLoggedin ? "inline" : "none",
                marginLeft: "1rem",
              }}
              onClick={logoutHandler}
            >
              Logout
            </Button>

            <span className={styles["login-statusbar"]}>
              <Typography display="inline">
                {isLoggedin ? `logged in as: ${loggedInEmail}` : "logged out"}
              </Typography>
            </span>
          </div>

          <MainNav />
        </Toolbar>
      </AppBar>

      <Fragment>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showBackDrop}
        >
          <OutsideClickHandler onOutsideClick={closeShowSideBarHandler}>
            <SideBar />
          </OutsideClickHandler>
        </Backdrop>
      </Fragment>
    </Fragment>
  );
};

export default Header;
