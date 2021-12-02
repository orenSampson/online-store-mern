// import { Fragment } from "react";
import { useDispatch } from "react-redux";

import styles from "./Pagination.module.scss";

const backButtonName = "< Back";
const nextButtonName = "Next >";

function Pagination(props) {
  const dispatch = useDispatch();

  const incementPageHandler = () => {
    dispatch(
      props.get_products({
        category: props.category,
        page: props.currentPage + 1,
      })
    );
  };

  const decrementPageHandler = () => {
    dispatch(
      props.get_products({
        category: props.category,
        page: props.currentPage - 1,
      })
    );
  };

  const BackButton = props.currentPage !== 1 && (
    <button onClick={decrementPageHandler}>{backButtonName}</button>
  );
  const ForwardButton = !props.isLastPage && (
    <button onClick={incementPageHandler}>{nextButtonName}</button>
  );

  const Content = !!(props.completeArray?.length !== 0) && (
    <div>
      {BackButton}
      <span
        className={styles["pageNumber"]}
      >{`${props.currentPage} of ${props.totalPages}`}</span>
      {ForwardButton}
    </div>
  );

  return <div className={styles["Pagination"]}>{Content}</div>;
}

export default Pagination;
