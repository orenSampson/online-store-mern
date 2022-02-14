import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import PriceFormatter from "../../general/PriceFormatter/PriceFormatter";
import ShowAmount from "../../general/ShowAmount/ShowAmount";

const ProductModal = (props) => {
  const styles = {
    ProductModal: {
      position: "fixed",
      zIndex: 200,
      top: "20%",
      left: "25%",
      width: "50%",
      display: props.show ? "block" : "none",
    },

    ProductModal_CardMedia: {
      height: "14rem",
    },
  };

  styles.ProductModal = {
    ...styles.ProductModal,
    ...(props.customStyle || {}),
  };

  return (
    <Card sx={styles.ProductModal}>
      <CardMedia
        sx={styles.ProductModal_CardMedia}
        component="img"
        image={props.image}
        alt="image"
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {props.title}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {props.description}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {props.category}
        </Typography>

        <Typography variant="h6" gutterBottom>
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
    </Card>
  );
};

export default ProductModal;
