import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

import styles from "./MainNav.module.scss";

function MainNav() {
  return (
    <nav className={styles["main-nav"]}>
      <ul>
        <li>
          <NavLink className={styles["main-nav__item"]} to="/auth">
            Sigup\Login
          </NavLink>
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
