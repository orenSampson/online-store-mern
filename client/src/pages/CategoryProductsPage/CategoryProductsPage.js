import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ProductsManager from "../../components/products/ProductsManager/ProductsManager";
import {
  productsCategorySetter,
  getProducts,
} from "../../store/products/actions";

const CategoryProductsViewer = () => {
  const { category } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ category: category, page: 1 }));
    dispatch(productsCategorySetter(category));
  }, [dispatch, category]);

  return (
    <Fragment>
      <ProductsManager />
    </Fragment>
  );
};

export default CategoryProductsViewer;
