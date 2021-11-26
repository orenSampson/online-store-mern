import React from "react";

import styles from "./PriceFormatter.module.scss";
const PriceFormatter = (props) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");

  const priceObj = {
    whole: dollarUSLocale.format(Math.floor(props.price)),
    remainder:
      Math.floor((props.price - Math.floor(props.price)) * 100) || "00",
  };

  return (
    <span className={styles["price"]}>
      {priceObj.whole}
      <small>
        <sup>{priceObj.remainder}</sup>
      </small>
    </span>
  );
};

export default PriceFormatter;
