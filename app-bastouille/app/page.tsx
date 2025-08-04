import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isMobileUserAgent } from "@lib/device";

export const dynamic = "force-dynamic";

function isSamsungFrameTV(userAgent: string): boolean {
  // Mozilla/5.0 (SMART-TV; Linux; Tizen 5.5) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.0 Chrome/94.0.4606.31 TV Safari/537.36
  return /Samsung.*FrameTV/i.test(userAgent) || /SMART-TV.*Tizen.*SamsungBrowser/i.test(userAgent);
}

export default function Home() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  let target = "/desktop";
  if (isSamsungFrameTV(userAgent)) {
    target = "/tv";
  } else if (isMobileUserAgent(userAgent)) {
    target = "/mobile";
  }

  console.log("[USER-AGENT]: ", userAgent);
  console.log("[TARGET].   : ", target);

  redirect(target);
}
