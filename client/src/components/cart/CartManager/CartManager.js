import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as cartActions from "../../../store/cart/actions";
import Products from "../../products/Products/Products";
import PriceFormatter from "../../general/PriceFormater/PriceFormatter";
import * as messages from "../../../store/constants/messages";
import styles from "./CartManager.module.scss";

function CartManager() {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cartReducers.products);

  const totalPriceBeforeDiscount = useSelector(
    (state) => state.cartReducers.totalPriceBeforeDiscount
  );

  const totalPriceAfterDiscount = useSelector(
    (state) => state.cartReducers.totalPriceAfterDiscount
  );

  const isDiscountApplied = useSelector(
    (state) => state.cartReducers.isDiscountApplied
  );

  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  const discountAppliedRelatedElements = (
    <Fragment>
      <h3>Discount Apllied!!</h3>
      <h3>
        Price Before Discount:{" "}
        <PriceFormatter price={totalPriceBeforeDiscount} />
      </h3>
      <h3>
        Price After Discount: <PriceFormatter price={totalPriceAfterDiscount} />
      </h3>
      <h3>
        You Saved{" "}
        <PriceFormatter
          price={totalPriceBeforeDiscount - totalPriceAfterDiscount}
        />
      </h3>
    </Fragment>
  );

  const TotalPrice = isDiscountApplied ? (
    discountAppliedRelatedElements
  ) : (
    <h3>
      Total Price: <PriceFormatter price={totalPriceBeforeDiscount} />
    </h3>
  );

  const sendTransactionHandler = () => {
    dispatch(cartActions.cart_send_transaction());
  };

  const clearCartHandler = () => {
    dispatch(cartActions.cart_clear_cart());
  };

  return (
    <div>
      {!cartProducts?.length ? (
        "Cart Is Empty"
      ) : (
        <Fragment>
          <div>
            <button
              className={styles["cart-button"]}
              onClick={clearCartHandler}
            >
              Clear Cart
            </button>
          </div>
          <Products
            products={cartProducts}
            showAddToCartBtn={false}
            isCart={true}
          />

          {TotalPrice}

          {isLoggedin ? (
            <div>
              <button
                className={styles["cart-button"]}
                onClick={sendTransactionHandler}
              >
                Submit Transaction
              </button>
            </div>
          ) : (
            messages.NOT_LOGGED_IN_TRANSACTION
          )}
        </Fragment>
      )}
    </div>
  );
}

export default CartManager;
