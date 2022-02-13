import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

const styles = {
  PaginationComponent: { display: "flex", justifyContent: "center" },
};

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

  styles.PaginationComponent = {
    ...styles.PaginationComponent,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.PaginationComponent}>
      <Pagination
        size="large"
        variant="outlined"
        color="primary"
        count={props.totalPages}
        page={props.currentPage}
        onChange={handleChange}
      />
    </Box>
  );
}
