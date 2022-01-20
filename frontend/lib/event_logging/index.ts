/**
 * Utility functions for managing pixel tracking
 */
export { renderSegmentSnippet } from "./segment";
import { identifySegment, logSegmentEvent } from "./segment";
import { EventType, EventOptions, UserIdentifiers } from "./types";

export const GA_TRACKING_ID = "G-PP7FBMRCW2";
export const ADWORDS_ID = "AW-468409347";
export const FB_PIXEL_ID = 732028701046966;
export const SNAP_ID = "4eade020-d9f9-4891-a2e8-e896be316bd5";
export const TIKTOK_ID = "C0RA7RHURMH959SBQQM0";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const logGooglePageview = (url: string) => {
  // @ts-ignore
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

const gtag = (...args: any[]) => {
  try {
    // @ts-ignore
    window.dataLayer.push(...args);
  } catch (e) {
    console.log(e);
  }
};

// Only logs an event if it's an ads conversion, normal events
// go to analytics through GTM
export const logGoogleConversion = (event: EventType) => {
  if (event === "purchase") {
    gtag("event", "conversion", {
      send_to: "AW-347487498/Tb-5CIGi5dgCEIr62KUB",
      transaction_id: "",
    });
  } else if (event === "create-account") {
    gtag("event", "conversion", {
      send_to: "AW-347487498/7Gv1CMvvutgCEIr62KUB",
    });
  }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const logFacebookEvent = (
  event: EventType,
  options = {} as EventOptions
) => {
  // @ts-ignore
  const track = (e: string) => window.fbq("track", e, options);
  // @ts-ignore
  const trackCustom = (e: string) => window.fbq("trackCustom", e, options);

  const fbEvent = null;
  switch (event) {
    case "page-view":
      track("PageView");
      break;
    case "start-checkout":
      track("InitiateCheckout");
      break;
    case "purchase":
      // TODO(sbb): add predicted LTV?
      track("Subscribe");
      break;
    case "create-account":
      track("CompleteRegistration");
      break;
    case "join-waitlist":
    case "start-assessment":
    case "complete-assessment":
    default:
      trackCustom(event);
      break;
  }
};

export const logTikTokEvent = (event: EventType) => {
  let ttEvent = null;
  switch (event) {
    case "page-view":
      ttEvent = "Browse";
      break;
    case "start-checkout":
      ttEvent = "Start-Checkout";
      break;
    case "purchase":
      ttEvent = "Purchase";
      break;
    case "create-account":
      ttEvent = "Registration";
      break;
    case "join-waitlist":
    case "start-assessment":
    case "complete-assessment":
      ttEvent = event;
  }
  try {
    // @ts-ignore
    window.ttq.track(ttEvent);
  } catch {
    console.error(`failed to log tiktok event: ${event}`);
  }
};

export const logSnapEvent = (event: EventType) => {
  let snapEvent = null;
  switch (event) {
    case "page-view":
      snapEvent = "PAGE_VIEW";
      break;
    case "start-checkout":
      snapEvent = "START_CHECKOUT";
      break;
    case "purchase":
      snapEvent = "PURCHASE";
      break;
    case "create-account":
      snapEvent = "SIGN_UP";
      break;
    case "join-waitlist":
    case "start-assessment":
    case "complete-assessment":
      snapEvent = event;
  }
  // @ts-ignore
  // window.snaptr("track", snapEvent);
};

export const logPageView = (url: string) => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  // Google requires a url
  // logGooglePageview(url);

  logSegmentEvent("page-view");
  logFacebookEvent("page-view");
  // logSnapEvent("page-view");
  logTikTokEvent("page-view");
};

export const logEvent = (event: EventType, options = {} as EventOptions) => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  logGoogleConversion(event);
  logFacebookEvent(event);
  logSegmentEvent(event, options);
  // logSnapEvent(event);
  logTikTokEvent(event);
};

export const identifyUser = (identifiers: UserIdentifiers) => {
  identifySegment(identifiers);

  // @ts-ignore
  // window.snaptr("init", SNAP_ID, { user_email: identifiers.email });
};
