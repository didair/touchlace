import React, { useState, useEffect } from "react";

const Delay = ({ children, delay }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(showTimer);
  });

  return done && <>{children}</>;
};

export default Delay;