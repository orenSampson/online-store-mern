import numeral from "numeral";
import { Box } from "@mui/material";

const styles = {
  PriceFormatter: {},
};

const PriceFormatter = (props) => {
  const priceObj = {
    whole: numeral(Math.floor(props.price)).format("$0,0"),
    remainder:
      Math.floor((props.price - Math.floor(props.price)) * 100) || "00",
  };

  styles.PriceFormatter = {
    ...styles.PriceFormatter,
    ...(props.customStyle || {}),
  };

  return (
    <Box component="span" sx={styles.PriceFormatter}>
      {priceObj.whole}
      <small>
        <sup>{priceObj.remainder}</sup>
      </small>
    </Box>
  );
};

export default PriceFormatter;
