import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { Backdrop, AppBar, Toolbar, Typography, Box } from "@mui/material";

import SideBar from "../SideBar/SideBar";
import MainNav from "../MainNav/MainNav";
import * as generalActions from "../../../store/general/actions";
import { GENERAL_INITIAL_STATE } from "../../../store/general/reducers";
import { IoStorefrontOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Header.module.scss";

const sxStyles = {
  Header: {},
  mainHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftIcons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginStatusbar: {
    marginLeft: "0.7rem",
  },
  Backdrop: { color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 },
};

const Header = (props) => {
  const dispatch = useDispatch();

  const showSideBar = useSelector((state) => state.generalReducers.showSideBar);

  const showBackDrop = useSelector(
    (state) => state.generalReducers.showBackDrop
  );

  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  const loggedInEmail = useSelector(
    (state) => state.authReducers.loggedUserEmail
  );

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

  sxStyles.Header = {
    ...styles.Header,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={sxStyles.Header}>
      <AppBar elevation={0} position="static">
        <Toolbar sx={sxStyles.mainHeader}>
          <Box sx={sxStyles.leftIcons}>
            <Box component="span">
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
            </Box>

            <Box component="span" sx={sxStyles.loginStatusbar}>
              <Typography display="inline">
                {isLoggedin ? `logged in as: ${loggedInEmail}` : "logged out"}
              </Typography>
            </Box>
          </Box>

          <MainNav />
        </Toolbar>
      </AppBar>

      <Fragment>
        <Backdrop sx={sxStyles.Backdrop} open={showBackDrop}>
          <OutsideClickHandler onOutsideClick={closeShowSideBarHandler}>
            <SideBar />
          </OutsideClickHandler>
        </Backdrop>
      </Fragment>
    </Box>
  );
};

export default Header;
