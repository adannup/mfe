import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const MarketingApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate, unmount } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        // IMPORTANT! To avoid infinite loop
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    const unlistenBrowser = history.listen((location) => {
      onParentNavigate(location);
    });

    return () => {
      unlistenBrowser();
      unmount();
    };
  }, []);

  return <div ref={ref}></div>;
};

export default MarketingApp;
