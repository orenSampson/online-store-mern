import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { v4 as uuidv4 } from "uuid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

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
          <NavLink
            className={styles["ProductsHeader__item"]}
            key={uuidv4()}
            to={to}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </NavLink>
        );
      })
    : null;

  NavigationLinks = !isLoading && NavigationLinks;

  return (
    <Fragment>
      <ClipLoader loading={isLoading} size={150} />
      <AppBar position="static">
        <Toolbar className={styles["ProductsHeader"]}>
          {NavigationLinks}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default ProductsHeader;
