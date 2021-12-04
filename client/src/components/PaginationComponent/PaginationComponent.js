import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";

import styles from "./PaginationComponent.module.scss";

export default function PaginationComponent(props) {
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(
      props.get_products({
        category: props.category,
        page: value,
      })
    );
  };

  return (
    <div className={styles["PaginationComponent"]}>
      <Pagination
        size="large"
        variant="outlined"
        color="primary"
        count={props.totalPages}
        page={props.currentPage}
        onChange={handleChange}
      />
    </div>
  );
}
