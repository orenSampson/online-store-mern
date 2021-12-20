import React, { Fragment } from "react";

const PriceFormatter = (props) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");

  const priceObj = {
    whole: dollarUSLocale.format(Math.floor(props.price)),
    remainder:
      Math.floor((props.price - Math.floor(props.price)) * 100) || "00",
  };

  return (
    <Fragment>
      {"$"}
      {priceObj.whole}
      <small>
        <sup>{priceObj.remainder}</sup>
      </small>
    </Fragment>
  );
};

export default PriceFormatter;
