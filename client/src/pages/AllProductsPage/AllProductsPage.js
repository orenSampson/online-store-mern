import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import ProductsManager from "../../components/products/ProductsManager/ProductsManager";
import {
  products_category_setter,
  get_products,
} from "../../store/products/actions";
import { ALL_PRODUCTS } from "../../constants/products";

function AllProductsViewer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_products({ category: ALL_PRODUCTS, page: 1 }));
    dispatch(products_category_setter(ALL_PRODUCTS));
  }, [dispatch]);

  return (
    <Fragment>
      <ProductsManager />
    </Fragment>
  );
}

export default AllProductsViewer;
