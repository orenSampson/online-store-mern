import styles from "./Products.module.scss";
import Product from "../Product/Product";

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

  return <div className={styles["Products"]}>{RenderProducts}</div>;
};

export default Products;
