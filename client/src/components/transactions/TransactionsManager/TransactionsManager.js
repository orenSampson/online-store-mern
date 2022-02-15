import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";

import Transaction from "../Transactions/Transaction";
import ClipLoaderComponent from "../../general/ClipLoaderComponent/ClipLoaderComponent";
import * as transactionsActions from "../../../store/transactions/actions";

const styles = {
  TransactionsManager: {},
};

function TransactionsManager(props) {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state) => state.transactionsReducers.transactions
  );

  const isLoading = useSelector((state) => state.loadingReducers.isLoading);

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

  useEffect(() => {
    dispatch(transactionsActions.transactions_get_transactions());
  }, [dispatch]);

  styles.TransactionsManager = {
    ...styles.TransactionsManager,
    ...(props.customStyle || {}),
  };

  return (
    <Box sx={styles.TransactionsManager}>
      <Box>{transactionsComponents}</Box>;
      <ClipLoaderComponent isLoading={isLoading} />
    </Box>
  );
}

export default TransactionsManager;
