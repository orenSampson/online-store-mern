import ClipLoader from "react-spinners/ClipLoader";
import { Box } from "@mui/material";

const styles = {
  ClipLoaderComponent: {
    position: "fixed",
    top: "40%",
    left: "45%",
  },
};

const ClipLoaderComponent = (props) => {
  styles.ClipLoaderComponent = {
    ...styles.ClipLoaderComponent,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.ClipLoaderComponent}>
      <ClipLoader loading={props.isLoading} size={150} />
    </Box>
  );
};

export default ClipLoaderComponent;
