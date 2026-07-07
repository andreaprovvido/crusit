import { permanentRedirect } from "next/navigation";

// The Cruising hub has been merged into the unified Explore page (/spots),
// which now includes the discover-by-country/city/category index.
export default function CruisingHubPage() {
  permanentRedirect("/spots");
}
