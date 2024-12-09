import { ReactNode, useEffect, useState } from "react";

interface DelayedWrapperProps {
  delay: number;
  children: ReactNode;
}

function DelayedWrapper({ delay, children }: DelayedWrapperProps) {
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
