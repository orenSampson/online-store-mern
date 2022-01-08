import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Transaction from "../Transactions/Transaction";
import ClipLoaderComponent from "../../general/ClipLoaderComponent/ClipLoaderComponent";
import * as transactionsActions from "../../../store/transactions/actions";

function TransactionsManager() {
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
        key={index}
      />
    );
  });

  useEffect(() => {
    dispatch(transactionsActions.transactions_get_transactions());
  }, [dispatch]);

  return (
    <div>
      <div>{transactionsComponents}</div>;
      <ClipLoaderComponent isLoading={isLoading} />
    </div>
  );
}

export default TransactionsManager;
