import React from "react";

import PriceFormatter from "../../general/PriceFormater/PriceFormatter";
import ShowAmount from "../../general/ShowAmount/ShowAmount";
import styles from "./ProductModal.module.scss";

const ProductModal = (props) => {
  const cssClasses = [
    styles["ProductModal"],
    props.show ? styles["ProductModalOpen"] : styles["ProductModalClosed"],
  ];

  return (
    <div className={cssClasses.join(" ")}>
      <img
        className={styles["ProductModal-picture"]}
        src={props.image}
        alt="product"
      />
      <div>
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>{props.category}</p>
        <p>
          <ShowAmount
            amount={props.amount}
            showAddToCartBtn={props.showAddToCartBtn}
            isCart={props.isCart}
          />
        </p>
        <PriceFormatter price={props.price} />
      </div>
    </div>
  );
};

export default ProductModal;
