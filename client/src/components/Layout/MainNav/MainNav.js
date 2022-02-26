import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";

import * as authActions from "../../../store/auth/actions";
import styles from "./MainNav.module.scss";

function MainNav() {
  const dispatch = useDispatch();

  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  const logoutHandler = () => {
    dispatch(authActions.authLogout());
  };

  return (
    <nav className={styles["main-nav"]}>
      <ul>
        <li>
          {!isLoggedin ? (
            <NavLink className={styles["main-nav__item"]} to="/auth">
              Signup\Login
            </NavLink>
          ) : (
            <Button
              variant="contained"
              color="warning"
              disableElevation
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
        </li>
        <li>
          <NavLink className={styles["main-nav__item"]} to="/transactions">
            Transactions
          </NavLink>
        </li>
        <li>
          <NavLink className={styles["main-nav__cart"]} to="/cart">
            <AiOutlineShoppingCart
              className={styles.AiOutlineShoppingCart}
              size={40}
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
