import React, { useRef, useEffect } from "react";
import { mount } from "dashboard/DashboardApp";

const MicroFrontend = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!mount || !ref.current) return;
    mount(ref.current);
  }, []);

  return <div ref={ref}></div>;
};

export default MicroFrontend;
