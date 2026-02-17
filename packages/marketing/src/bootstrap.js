import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  const unlisten = history.listen((historyEventListen) => {
    if (onNavigate) {
      onNavigate(historyEventListen);
    }
  });

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
    unmount() {
      unlisten();
      ReactDOM.unmountComponentAtNode(el);
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
