import React, { lazy, Suspense, useState, useEffect } from "react";
import MicroFrontend from "./components/MicroFrontend";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const MarketingAppLazy = lazy(() =>
  import("marketing/MarketingApp").then((module) => ({
    default: () => <MicroFrontend mount={module.mount} name="marketing" />,
  })),
);

const AuthAppLazy = lazy(() =>
  import("auth/AuthApp").then((module) => ({
    default: (props) => (
      <MicroFrontend mount={module.mount} name="auth" {...props} />
    ),
  })),
);

const DashboardAppLazy = lazy(() => import("./components/DashboardApp"));
const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => {
            setIsSignedIn(false);
          }}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthAppLazy
                onSignIn={() => {
                  setIsSignedIn(true);
                }}
              />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardAppLazy />
            </Route>
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};

export default App;
