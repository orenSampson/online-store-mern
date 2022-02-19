import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { Box, PaginationItem } from "@mui/material";

const styles = {
  PaginationComponent: { display: "flex", justifyContent: "center" },
};

export default function PaginationComponent(props) {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state) => state.paginationReducers.currentPage
  );

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
        renderItem={(item) => {
          if (currentPage === item.page && item.type === "page") {
            return (
              <PaginationItem
                {...item}
                sx={{
                  pointerEvents: "none",
                }}
              />
            );
          }

          return <PaginationItem {...item} />;
        }}
      />
    </Box>
  );
}
