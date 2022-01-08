import { Fragment } from "react";
import { Typography } from "@mui/material";

import Products from "../../products/Products/Products";
import PriceFormatter from "../../general/PriceFormatter/PriceFormatter";
import styles from "./Transaction.module.scss";

const Transaction = (props) => {
  return (
    <Fragment>
      <Typography className={styles["date"]} variant="h6">
        <span>Purchase Date:</span> {` ${props.createdAt}`}
      </Typography>

      <Products
        products={props.productsAndAmound}
        isTransactions={true}
        isCart={false}
      />

      <Typography className={styles["discountMsg"]} variant="h6">
        {props.discountPercentage &&
          `There was a ${props.discountPercentage}% discount`}
      </Typography>

      <Typography className={styles["date"]} variant="h6">
        <span>Total Price: </span>
        <PriceFormatter price={props.totalPrice} />
      </Typography>

      <hr />
    </Fragment>
  );
};

export default Transaction;
