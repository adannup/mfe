import React, { lazy, Suspense, useState } from "react";
import MicroFrontend from "./components/MicroFrontend";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

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

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
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
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
