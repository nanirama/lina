/**
 * Segment snippet rendering + tracking implementation
 */
// @ts-ignore
import snippet from "@segment/snippet";
import { EventType, EventOptions, UserIdentifiers } from "./types";

export const renderSegmentSnippet = (): string => {
  const nodeEnv = process.env.NODE_ENV ?? "development";
  const apiKey = process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY;
  const opts = {
    apiKey,
    page: true,
  };
  return nodeEnv === "development" ? snippet.max(opts) : snippet.min(opts);
};

export const logSegmentEvent = (
  event: EventType,
  properties = {} as EventOptions
): void => {
  if (event !== "page-view") {
    window.analytics.track(event, properties);
  } else {
    logSegmentPageView();
  }
};

const logSegmentPageView = () => {
  window.analytics.page();
};

export const identifySegment = (idenifiers: UserIdentifiers) => {
  window.analytics.identify(idenifiers);
};
