import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { v4 as uuidv4 } from "uuid";
import { AppBar, Toolbar } from "@mui/material";

import styles from "./ProductsHeader.module.scss";

const sxStyles = {
  ProductsHeader: {
    width: "100%",
    backgroundColor: "palegoldenrod",
    margin: 0,
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "0.5rem 0",
  },
};

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
      <AppBar elevation={0} position="static">
        <Toolbar sx={sxStyles.ProductsHeader}>{NavigationLinks}</Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default ProductsHeader;
