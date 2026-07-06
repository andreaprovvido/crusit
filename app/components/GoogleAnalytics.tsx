import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!measurementId) {
    return null;
  }

  return <NextGoogleAnalytics gaId={measurementId} />;
}
