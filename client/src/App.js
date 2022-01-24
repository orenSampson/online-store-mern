import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import ClipLoader from "react-spinners/ClipLoader";

import { startup } from "./store/startup/actions";
import Layout from "./components/Layout/Layout";
import { history } from "./store/index";

const AllProductsPage = React.lazy(() =>
  import("./pages/AllProductsPage/AllProductsPage")
);
const CategoryProductsPage = React.lazy(() =>
  import("./pages/CategoryProductsPage/CategoryProductsPage")
);
const NotFoundPage = React.lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);
const AuthPage = React.lazy(() => import("./pages/AuthPage/AuthPage"));

const CartPage = React.lazy(() => import("./pages/Cart/CartPage"));

const TransactionsPage = React.lazy(() =>
  import("./pages/TransactionsPage/TransactionsPage")
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startup());
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <div>
        <Layout>
          <main>
            <Suspense fallback={<ClipLoader loading={true} size={150} />}>
              <Switch>
                <Route exact path="/">
                  <AllProductsPage />
                </Route>
                <Route path="/categories/:category">
                  <CategoryProductsPage />
                </Route>
                <Route path="/auth">
                  <AuthPage />
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>
                <Route path="/transactions">
                  <TransactionsPage />
                </Route>
                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </Suspense>
          </main>
        </Layout>
      </div>
    </ConnectedRouter>
  );
};

export default App;
