import React, { lazy, Suspense } from "react";
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
    default: () => <MicroFrontend mount={module.mount} name="auth" />,
  })),
);

const App = () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth" component={AuthAppLazy} />
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
