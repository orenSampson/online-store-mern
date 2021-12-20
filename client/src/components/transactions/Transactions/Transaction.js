import React from "react";

import Products from "../../products/Products/Products";
import PriceFormatter from "../../general/PriceFormatter/PriceFormatter";
import styles from "./Transaction.module.scss";

const Transaction = (props) => {
  return (
    <div>
      <div className={styles["labels"]}>
        <span>Purchase Date:</span>
        {` ${props.createdAt}`}
      </div>
      <Products
        products={props.productsAndAmound}
        isTransactions={true}
        isCart={false}
      />
      <div className={styles["labels"]}>
        {props.discountPercentage &&
          `There was a ${props.discountPercentage}% discount`}
      </div>
      <div>
        <span className={styles["labels"]}>Total Price: </span>
        <span className={styles["price"]}>
          <PriceFormatter price={props.totalPrice} />
        </span>
      </div>

      <br></br>
      <hr />
    </div>
  );
};

export default Transaction;
