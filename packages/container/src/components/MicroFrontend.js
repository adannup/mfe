import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const MicroFrontend = ({ mount }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (!mount || !ref.current) return;

    const { onParentNavigate, unmount } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        // IMPORTANT! To avoid infinite loop
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      initialPath: history.location.pathname,
    });

    const unlistenBrowser = history.listen((location) => {
      onParentNavigate(location);
    });

    return () => {
      unlistenBrowser();
      unmount();
    };
  }, [mount, history]);

  return <div ref={ref}></div>;
};

export default MicroFrontend;
