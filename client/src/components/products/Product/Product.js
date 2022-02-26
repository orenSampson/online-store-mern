import { useState } from "react";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  CardActionArea,
  Box,
} from "@mui/material";

import ShowAmount from "../../general/ShowAmount/ShowAmount";
import PriceFormatter from "../../general/PriceFormatter/PriceFormatter";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import * as cartActions from "../../../store/cart/actions";
import ProductModal from "../ProductModal/ProductModal";
import Backdrop from "../../Layout/Backdrop/Backdrop";

const charCount = 35;

const styles = {
  Product: {},
  ProductCard: {
    width: "21rem",
    margin: "1rem 0.2rem 0.5rem 0.2rem",
  },

  ProductPicture: {
    height: "10rem",
    objectFit: "contain",
  },

  ProductTitle: {
    height: "4.5rem",
    textAlign: "center",
  },

  ProductCategory: {
    height: "2rem",
  },

  ProductAmount: {
    height: "2.5rem",
  },

  ProductCardActions: {
    justifyContent: "center",
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Product = (props) => {
  const dispatch = useDispatch();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const addTocartHandler = () => {
    dispatch(
      cartActions.cartAddRemoveProduct({
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

  styles.Product = {
    ...styles.Product,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.Product}>
      <Box>
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
      </Box>
      <Card sx={styles.ProductCard} elevation={1}>
        <CardActionArea onClick={openProductModalHandler}>
          <CardMedia
            sx={styles.ProductPicture}
            component="img"
            image={props.image}
            alt="image"
          />
          <CardContent sx={styles.cardContent}>
            <Typography sx={styles.ProductTitle} gutterBottom variant="h6">
              {shortTitle}
            </Typography>
            <Typography
              sx={styles.ProductCategory}
              gutterBottom
              variant="body1"
              noWrap
            >
              {props.category}
            </Typography>
            <Typography sx={styles.ProductAmount} gutterBottom variant="h6">
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
          <CardActions sx={styles.ProductCardActions}>
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
    </Box>
  );
};

export default Product;
