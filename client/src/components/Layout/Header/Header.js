import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

import SideBar from "../SideBar/SideBar";
import Backdrop from "../Backdrop/Backdrop";
import MainNav from "../MainNav/MainNav";
import * as generalActions from "../../../store/general/actions";
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

  return (
    <Fragment>
      <header className={styles["main-header"]}>
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

          <span>
            {loggedInEmail ? `logged in as: ${loggedInEmail}` : "logged out"}
          </span>
        </div>

        <MainNav />
      </header>

      <Fragment>
        <Backdrop showBackDrop={showBackDrop} />
        <OutsideClickHandler onOutsideClick={closeShowSideBarHandler}>
          <SideBar />
        </OutsideClickHandler>
      </Fragment>
    </Fragment>
  );
};

export default Header;
