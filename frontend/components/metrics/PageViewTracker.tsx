/**
 * Used to track page views with our event logging library. Hooks into
 * next.js router events in order to trigger the log pageview function
 * upon every navigation event.
 */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { logPageView } from "../../lib/event_logging";

const handleRouteChange = (url: string) => {
  logPageView(url);
};

const PageViewTracker: React.FC<{}> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // trigger on initial page view
    logPageView(router.pathname);

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <>{children}</>;
};

export default PageViewTracker;
