import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import ProductsManager from "../../components/products/ProductsManager/ProductsManager";
import {
  productsCategorySetter,
  getProducts,
} from "../../store/products/actions";
import { ALL_PRODUCTS } from "../../constants/products";

function AllProductsViewer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ category: ALL_PRODUCTS, page: 1 }));
    dispatch(productsCategorySetter(ALL_PRODUCTS));
  }, [dispatch]);

  return (
    <Fragment>
      <ProductsManager />
    </Fragment>
  );
}

export default AllProductsViewer;
