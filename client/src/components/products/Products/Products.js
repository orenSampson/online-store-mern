import { Box } from "@mui/material";
import Product from "../Product/Product";

const styles = {
  Products: {
    width: "100vw",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
};

const Products = (props) => {
  const RenderProducts = props.products?.map((product) => (
    <Product
      id={product.id}
      title={product.title}
      description={product.description}
      category={product.category}
      price={product.price}
      amount={product.amount}
      image={product.image}
      showAddToCartBtn={props.showAddToCartBtn}
      isCart={props.isCart}
      key={product.id}
    />
  ));

  styles.Products = {
    ...styles.Products,
    ...(props.customStyle || {}),
  };

  return <Box sx={styles.Products}>{RenderProducts}</Box>;
};

export default Products;
