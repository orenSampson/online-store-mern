import { useState } from "react";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";

import ShowAmount from "../../general/ShowAmount/ShowAmount";
import PriceFormatter from "../../general/PriceFormatter/PriceFormatter";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import * as cartActions from "../../../store/cart/actions";
import ProductModal from "../ProductModal/ProductModal";
import Backdrop from "../../Layout/Backdrop/Backdrop";
import styles from "./Product.module.scss";

const charCount = 35;

const Product = (props) => {
  const dispatch = useDispatch();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const addTocartHandler = () => {
    dispatch(
      cartActions.cart_add_remove_product({
        id: props.id,
        title: props.title,
        description: props.description,
        category: props.category,
        price: props.price,
        amount: 1,
        image: props.image,
      })
    );
  };

  const shortTitle =
    props.title.slice(0, charCount) +
    (props.title.length > charCount ? "..." : "");

  const openProductModalHandler = () => {
    setIsProductModalOpen(true);
  };

  const closeProductModalHandler = () => {
    setIsProductModalOpen(false);
  };

  return (
    <div>
      <div>
        <Backdrop showBackDrop={isProductModalOpen} />
        <OutsideClickHandler onOutsideClick={closeProductModalHandler}>
          <ProductModal
            title={props.title}
            description={props.description}
            category={props.category}
            price={props.price}
            amount={props.amount}
            image={props.image}
            showAddToCartBtn={props.showAddToCartBtn}
            isCart={props.isCart}
            show={isProductModalOpen}
          />
        </OutsideClickHandler>
      </div>
      <Card className={styles["Product"]} elevation={1}>
        <CardActionArea onClick={openProductModalHandler}>
          <CardMedia
            className={styles["Product-picture"]}
            component="img"
            image={props.image}
            alt="image"
          />
          <CardContent>
            <Typography
              className={styles["Product-title"]}
              gutterBottom
              variant="h6"
            >
              {shortTitle}
            </Typography>
            <Typography
              className={styles["Product-category"]}
              gutterBottom
              variant="body1"
              noWrap
            >
              {props.category}
            </Typography>
            <Typography
              className={styles["Product-amount"]}
              gutterBottom
              variant="h6"
            >
              <ShowAmount
                amount={props.amount}
                showAddToCartBtn={props.showAddToCartBtn}
                isCart={props.isCart}
              />
            </Typography>
            <Typography variant="h6">
              <PriceFormatter price={props.price} />
            </Typography>
          </CardContent>
        </CardActionArea>
        {props.showAddToCartBtn ? (
          <CardActions className={styles["Product-CardActions"]}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              disableElevation
              endIcon={<AddShoppingCartIcon />}
              onClick={addTocartHandler}
            >
              add to cart
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </div>
  );
};

export default Product;
