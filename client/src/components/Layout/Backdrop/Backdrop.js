import { Box } from "@mui/material";

const styles = {
  Backdrop: {
    position: "fixed",
    zIndex: "100",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const Backdrop = (props) => {
  return props.showBackDrop && <Box sx={styles.Backdrop}></Box>;
};

export default Backdrop;
