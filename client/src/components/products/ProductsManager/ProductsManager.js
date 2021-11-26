import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import Products from "../Products/Products";
import Pagination from "../../Pagination/Pagination";
import ProductsHeader from "../ProductsHeader/ProductsHeader";
import { get_products } from "../../../store/products/actions";
import styles from "./ProductsManager.module.scss";

function ProductsManager() {
  const isLoading = useSelector((state) => state.loadingReducers.isLoading);

  const currentPage = useSelector(
    (state) => state.paginationReducers.currentPage
  );

  const isLastPage = useSelector(
    (state) => state.paginationReducers.isLastPage
  );

  const totalPages = useSelector(
    (state) => state.paginationReducers.totalPages
  );

  const category = useSelector((state) => state.productsReducers.category);

  const products = useSelector((state) => state.productsReducers.products);

  return (
    <div className={styles["ProductsManager"]}>
      <ProductsHeader />
      <ClipLoader loading={isLoading} size={150} />
      <Products products={products} showAddToCartBtn={true} isCart={false} />
      <Pagination
        completeArray={products}
        currentPage={currentPage}
        isLastPage={isLastPage}
        totalPages={totalPages}
        category={category}
        get_products={get_products}
      />
    </div>
  );
}

export default ProductsManager;
