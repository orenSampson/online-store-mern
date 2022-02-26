import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";

import * as cartActions from "../../../store/cart/actions";
import Products from "../../products/Products/Products";
import PriceFormatter from "../../general/PriceFormatter/PriceFormatter";
import * as messages from "../../../store/constants/messages";

const styles = {
  CartManager: {},
  cartEmpty: {
    textAlign: "center",
  },
  clearCart: {
    marginTop: "0.5rem",
    marginLeft: "0.5rem",
  },
  pricing: {
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    marginTop: "0.5rem",
  },
  mustLoginMessage: {
    color: "red",
  },
};

function CartManager(props) {
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

  const sendTransactionHandler = () => {
    dispatch(cartActions.cartSendTransaction());
  };

  const clearCartHandler = () => {
    dispatch(cartActions.cartClearCart());
  };

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

  styles.CartManager = {
    ...styles.CartManager,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.CartManager}>
      {!cartProducts?.length ? (
        <Typography sx={styles.cartEmpty} variant="h5">
          Cart Is Empty
        </Typography>
      ) : (
        <Fragment>
          <Button
            sx={styles.clearCart}
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

          <Box sx={styles.pricing}>
            {TotalPrice}

            <Box sx={styles.submitButton}>
              {isLoggedin ? (
                <Button variant="contained" onClick={sendTransactionHandler}>
                  Submit Transaction
                </Button>
              ) : (
                <Typography sx={styles.mustLoginMessage} variant="h5">
                  {messages.NOT_LOGGED_IN_TRANSACTION}
                </Typography>
              )}
            </Box>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}

export default CartManager;
