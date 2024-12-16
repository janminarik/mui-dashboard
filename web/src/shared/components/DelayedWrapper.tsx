import { ReactNode, useEffect, useState } from "react";

interface DelayedWrapperProps {
  children: ReactNode;
  delay: number;
}

function DelayedWrapper({ children, delay }: DelayedWrapperProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return <>{isReady ? children : null}</>;
}

export default DelayedWrapper;
