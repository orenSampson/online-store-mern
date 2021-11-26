import { useState } from "react";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

import * as cartActions from "../../../store/cart/actions";
import Backdrop from "../../Layout/Backdrop/Backdrop";
import ProductModal from "../ProductModal/ProductModal";
import PriceFormater from "../../general/PriceFormater/PriceFormatter";
import ShowAmount from "../../general/ShowAmount/ShowAmount";
import styles from "./Product.module.scss";

const charCount = 50;

const Product = ({
  id,
  title,
  description,
  category,
  price,
  amount,
  image,
  showAddToCartBtn,
  isCart,
}) => {
  const dispatch = useDispatch();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const addTocartHandler = () => {
    dispatch(
      cartActions.cart_add_remove_product({
        id,
        title,
        description,
        category,
        price,
        amount: 1,
        image,
      })
    );
  };

  const shortTitle =
    title.slice(0, charCount) + (title.length > charCount ? "..." : "");

  const openProductModalHandler = () => {
    setIsProductModalOpen(true);
  };

  const closeProductModalHandler = () => {
    setIsProductModalOpen(false);
  };

  return (
    <div className={styles["Product"]}>
      <div
        className={styles["ProductWrapper"]}
        onClick={openProductModalHandler}
      >
        <div>
          <Backdrop showBackDrop={isProductModalOpen} />
          <OutsideClickHandler onOutsideClick={closeProductModalHandler}>
            <ProductModal
              title={title}
              description={description}
              category={category}
              price={price}
              amount={amount}
              image={image}
              showAddToCartBtn={showAddToCartBtn}
              isCart={isCart}
              show={isProductModalOpen}
            />
          </OutsideClickHandler>
        </div>
        <div>
          <img
            className={styles["Product-picture"]}
            src={image}
            alt="product"
          />
          <div className={styles["Product-details"]}>
            <p className={styles["Product-details__title"]}>{shortTitle}</p>
            <p>{category}</p>
            <p>
              <ShowAmount
                amount={amount}
                showAddToCartBtn={showAddToCartBtn}
                isCart={isCart}
              />
            </p>
            <PriceFormater price={price} />
          </div>
        </div>
      </div>
      {showAddToCartBtn ? (
        <button className={styles["Product-button"]} onClick={addTocartHandler}>
          Add to cart
        </button>
      ) : null}
    </div>
  );
};

export default Product;
