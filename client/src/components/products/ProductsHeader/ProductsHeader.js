import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { v4 as uuidv4 } from "uuid";

import styles from "./ProductsHeader.module.scss";

function ProductsHeader() {
  const isLoading = useSelector((state) => state.categoriesReducers.isLoading);

  const categories = useSelector(
    (state) => state.categoriesReducers.categories
  );

  let NavigationLinks = categories?.length
    ? categories.map((category, index) => {
        const to = `/categories/${category}`;

        return (
          <li key={uuidv4()}>
            <NavLink className={styles["ProductsHeader__item"]} to={to}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
          </li>
        );
      })
    : null;

  NavigationLinks = !isLoading && NavigationLinks;

  return (
    <Fragment>
      <ClipLoader loading={isLoading} size={150} />
      <nav className={styles["ProductsHeader"]}>
        <ul>{NavigationLinks}</ul>
      </nav>
    </Fragment>
  );
}

export default ProductsHeader;
