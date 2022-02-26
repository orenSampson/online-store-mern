import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Box, Typography } from "@mui/material";

import Transaction from "../Transactions/Transaction";
import ClipLoaderComponent from "../../general/ClipLoaderComponent/ClipLoaderComponent";
import * as transactionsActions from "../../../store/transactions/actions";

const styles = {
  TransactionsManager: {},
  messages: {
    textAlign: "center",
  },
};

function TransactionsManager(props) {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state) => state.transactionsReducers.transactions
  );

  const isLoading = useSelector((state) => state.loadingReducers.isLoading);

  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  useEffect(() => {
    if (isLoggedin) {
      dispatch(transactionsActions.transactionsGetTransactions());
    }
  }, [dispatch, isLoggedin]);

  const transactionsComponents = transactions.map((transaction, index) => {
    let currentDate = new Date(transaction.createdAt);
    currentDate =
      currentDate.getDate() +
      "/" +
      (currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear();

    return (
      <Transaction
        createdAt={currentDate}
        productsAndAmound={transaction.productsAndAmound}
        discountPercentage={transaction.discountPercentage}
        totalPrice={transaction.totalPrice}
        key={uuidv4()}
      />
    );
  });

  const renderedContent = !isLoggedin ? (
    <Typography sx={styles.messages} variant="h5">
      You must login inorder to watch your transactions history
    </Typography>
  ) : transactions.length === 0 ? (
    <Typography sx={styles.messages} variant="h5">
      You have no transactions yet
    </Typography>
  ) : (
    transactionsComponents
  );

  styles.TransactionsManager = {
    ...styles.TransactionsManager,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.TransactionsManager}>
      {renderedContent}
      <ClipLoaderComponent isLoading={isLoading} />
    </Box>
  );
}

export default TransactionsManager;
