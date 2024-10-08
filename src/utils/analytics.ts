import ReactGA from "react-ga4";

export const TRACKING_ID = "G-QN5LSXBJFK";

export const initAnalytics = () => {
  if (import.meta.env.MODE !== "development") {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send("pageview");
  }
};

export const logEvent = (eventName: string, category?: string) => {
  if (import.meta.env.MODE !== "development") {
    ReactGA.event({
      category: category || "default_category",
      action: eventName,
    });
  }
};
