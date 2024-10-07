import ReactGA from "react-ga4";

const TRACKING_ID = "G-QN5LSXBJFK";

export const initAnalytics = () => {
  if (import.meta.env.MODE !== "development") {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send("pageview");
  }
};

// export const logEvent = (eventName: string, eventParams) => {
//   if (import.meta.env.MODE !== "development") {
//     ReactGA.event({
//       category: eventParams.category || "default_category",
//       action: eventName,
//       label: eventParams.label || "",
//       value: eventParams.value || 0,
//     });
//   }
// };
