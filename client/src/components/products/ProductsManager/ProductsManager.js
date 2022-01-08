import { Fragment } from "react";
import { useSelector } from "react-redux";

import Products from "../Products/Products";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";
import ProductsHeader from "../ProductsHeader/ProductsHeader";
import ClipLoaderComponent from "../../general/ClipLoaderComponent/ClipLoaderComponent";
import { get_products } from "../../../store/products/actions";
import styles from "./ProductsManager.module.scss";

function ProductsManager() {
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
    <div className={styles["ClipLoader"]}>
      <ClipLoaderComponent isLoading={isLoading} />
    </div>
  ) : (
    <Fragment>
      <Products products={products} showAddToCartBtn={true} isCart={false} />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        category={category}
        get_products={get_products}
      />
    </Fragment>
  );

  return (
    <div className={styles["ProductsManager"]}>
      <ProductsHeader />
      {Content}
    </div>
  );
}

export default ProductsManager;
