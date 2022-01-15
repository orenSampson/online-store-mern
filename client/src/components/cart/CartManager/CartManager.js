import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";

import * as cartActions from "../../../store/cart/actions";
import Products from "../../products/Products/Products";
import PriceFormatter from "../../general/PriceFormatter/PriceFormatter";
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
      <Typography variant="h5">Discount Apllied!!</Typography>
      <Typography variant="h5">
        Price Before Discount:{" "}
        <PriceFormatter price={totalPriceBeforeDiscount} />
      </Typography>
      <Typography variant="h5">
        Price After Discount: <PriceFormatter price={totalPriceAfterDiscount} />
      </Typography>
      <Typography variant="h5">
        You Saved{" "}
        <PriceFormatter
          price={totalPriceBeforeDiscount - totalPriceAfterDiscount}
        />
      </Typography>
    </Fragment>
  );

  const TotalPrice = isDiscountApplied ? (
    discountAppliedRelatedElements
  ) : (
    <Typography variant="h5">
      Total Price: <PriceFormatter price={totalPriceBeforeDiscount} />
    </Typography>
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
        <Typography className={styles["cart-empty"]} variant="h5">
          Cart Is Empty
        </Typography>
      ) : (
        <Fragment>
          <Button
            className={styles["clear-cart"]}
            variant="contained"
            onClick={clearCartHandler}
          >
            Clear Cart
          </Button>
          <Products
            products={cartProducts}
            showAddToCartBtn={false}
            isCart={true}
          />

          <div className={styles.pricing}>
            {TotalPrice}

            <div className={styles["submit-button"]}>
              {isLoggedin ? (
                <Button variant="contained" onClick={sendTransactionHandler}>
                  Submit Transaction
                </Button>
              ) : (
                <Typography
                  className={styles["must-login-message"]}
                  variant="h5"
                >
                  {messages.NOT_LOGGED_IN_TRANSACTION}
                </Typography>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default CartManager;
