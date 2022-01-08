import React, { Fragment } from "react";
import numeral from "numeral";

const PriceFormatter = (props) => {
  const priceObj = {
    whole: numeral(Math.floor(props.price)).format("$0,0"),
    remainder:
      Math.floor((props.price - Math.floor(props.price)) * 100) || "00",
  };

  return (
    <Fragment>
      {priceObj.whole}
      <small>
        <sup>{priceObj.remainder}</sup>
      </small>
    </Fragment>
  );
};

export default PriceFormatter;
