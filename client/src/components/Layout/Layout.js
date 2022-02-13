import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";

import MessageDisplayer from "../MessageDisplayer/MessageDisplayer";
import Header from "./Header/Header";

const styles = {
  Layout: {},
  body: {
    display: "flex",
    flexDirection: "column",
  },
  mainSite: {
    flex: 1,
  },
};

const Layout = (props) => {
  styles.Layout = {
    ...styles.Layout,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.Layout}>
      <Box sx={styles.body}>
        <Header />
        <Box sx={styles.mainSite}>{props.children}</Box>
      </Box>
      <MessageDisplayer />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default Layout;
