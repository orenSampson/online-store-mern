import React, { Fragment } from "react";

const ShowAmount = (props) => {
  const Amount = props.isCart
    ? `${props.amount} added to cart`
    : props.showAddToCartBtn
    ? `${props.amount} left in stock`
    : `${props.amount} purchased`;

  return <Fragment>{Amount}</Fragment>;
};

export default ShowAmount;
