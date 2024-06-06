import React from "react";
import "./App.css";

import NavBar from "./navbar/NavBar";
import Carousel from "./homePage/components/Carousel";
import BigHeader from "./homePage/BigHeader";
import SearchBookPage from "./layout/SearchBookPage/SearchBookPage";
import { Route, Switch, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./layout/SearchBookPage/BookCheckoutPage/BookCheckoutPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import { AddNewBook } from "./homePage/components/AddNewBook";
const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    history.push("/login");
  };
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <NavBar />

        <Switch>
          <Route path="/" exact>
            <BigHeader />
            <Carousel />
          </Route>
        </Switch>
        <Route path="/search">
          <SearchBookPage />
        </Route>
        <Route path={"/checkout/:bookId"}>
          <BookCheckoutPage />
        </Route>
        <Route
          path={"/login"}
          render={() => <LoginWidget config={oktaConfig} />}
        />
        <Route path="/login/callback" component={LoginCallback} />
        <SecureRoute path="/admin">
          {" "}
          <AddNewBook />{" "}
        </SecureRoute>
      </Security>
    </div>
  );
};

export default App;
