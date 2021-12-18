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
import PriceFormater from "../../general/PriceFormater/PriceFormatter";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import * as cartActions from "../../../store/cart/actions";
import ProductModal from "../ProductModal/ProductModal";
import Backdrop from "../../Layout/Backdrop/Backdrop";

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
      <Card
        sx={{
          width: "16rem",
          height: "28rem",
          marginBottom: "0.5rem",
          marginX: "0.2rem",
        }}
        elevation={1}
      >
        <CardActionArea onClick={openProductModalHandler}>
          <CardMedia
            sx={{ height: "10rem" }}
            component="img"
            image={props.image}
            alt="image"
          />
          <CardContent>
            <Typography sx={{ height: "4.5rem" }} gutterBottom variant="h6">
              {shortTitle}
            </Typography>
            <Typography
              sx={{ height: "2rem" }}
              gutterBottom
              variant="body1"
              noWrap
            >
              {props.category}
            </Typography>
            <Typography sx={{ height: "2.5rem" }} gutterBottom variant="h6">
              <ShowAmount
                amount={props.amount}
                showAddToCartBtn={props.showAddToCartBtn}
                isCart={props.isCart}
              />
            </Typography>
            <Typography variant="h6">
              <PriceFormater price={props.price} />
            </Typography>
          </CardContent>
        </CardActionArea>
        {props.showAddToCartBtn ? (
          <CardActions sx={{ justifyContent: "center" }}>
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
