import { Box } from "@mui/material";

const styles = {
  ShowAmount: {},
};

const ShowAmount = (props) => {
  styles.ShowAmount = {
    ...styles.ShowAmount,
    ...(props.customStyle || {}),
  };

  const Amount = props.isCart
    ? `${props.amount} added to cart`
    : props.showAddToCartBtn
    ? `${props.amount} left in stock`
    : `${props.amount} purchased`;

  return <Box sx={styles.ShowAmount}>{Amount}</Box>;
};

export default ShowAmount;
