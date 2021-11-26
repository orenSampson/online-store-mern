import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ProductsManager from "../../components/products/ProductsManager/ProductsManager";
import {
  products_category_setter,
  get_products,
} from "../../store/products/actions";

const CategoryProductsViewer = () => {
  const { category } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_products({ category: category, page: 1 }));
    dispatch(products_category_setter(category));
  }, [dispatch, category]);

  return (
    <Fragment>
      <ProductsManager />
    </Fragment>
  );
};

export default CategoryProductsViewer;
