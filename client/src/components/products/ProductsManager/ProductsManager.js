import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import Products from "../Products/Products";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";
import ProductsHeader from "../ProductsHeader/ProductsHeader";
import ClipLoaderComponent from "../../general/ClipLoaderComponent/ClipLoaderComponent";
import { get_products } from "../../../store/products/actions";

const styles = {
  ProductsManager: {},
  ClipLoader: { position: "fixed", top: "30%", left: "45%" },
};

function ProductsManager(props) {
  const isLoading = useSelector((state) => state.loadingReducers.isLoading);

  const currentPage = useSelector(
    (state) => state.paginationReducers.currentPage
  );

  const totalPages = useSelector(
    (state) => state.paginationReducers.totalPages
  );

  const category = useSelector((state) => state.productsReducers.category);

  const products = useSelector((state) => state.productsReducers.products);

  const Content = isLoading ? (
    <Box sx={styles.ClipLoader}>
      <ClipLoaderComponent isLoading={isLoading} />
    </Box>
  ) : (
    <Fragment>
      <Products products={products} showAddToCartBtn={true} isCart={false} />
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          category={category}
          get_products={get_products}
        />
      )}
    </Fragment>
  );

  styles.ProductsManager = {
    ...styles.ProductsManager,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.ProductsManager}>
      <ProductsHeader />
      {Content}
    </Box>
  );
}

export default ProductsManager;
