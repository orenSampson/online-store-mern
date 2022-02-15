import { Box, Typography } from "@mui/material";

import Products from "../../products/Products/Products";
import PriceFormatter from "../../general/PriceFormatter/PriceFormatter";

const styles = {
  Transaction: {},
  date: {
    marginLeft: "1%",
    fontWeight: "bold",
  },

  date__span: {
    textDecoration: "underline",
  },

  discountMsg: {
    marginLeft: "1%",
    fontWeight: "bold",
  },
};

const Transaction = (props) => {
  styles.Transaction = {
    ...styles.Transaction,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.Transaction}>
      <Typography sx={styles.date} variant="h6">
        <Box sx={styles.date__span} component="span">
          Purchase Date:
        </Box>{" "}
        {` ${props.createdAt}`}
      </Typography>

      <Products
        products={props.productsAndAmound}
        isTransactions={true}
        isCart={false}
      />

      <Typography sx={styles.discountMsg} variant="h6">
        {props.discountPercentage &&
          `There was a ${props.discountPercentage}% discount`}
      </Typography>

      <Typography sx={styles.date} variant="h6">
        <Box component="span">Total Price: </Box>
        <PriceFormatter price={props.totalPrice} />
      </Typography>

      <hr />
    </Box>
  );
};

export default Transaction;
