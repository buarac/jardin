import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isMobileUserAgent } from "@lib/device";

export const dynamic = "force-dynamic";

export default function Home() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  const isMobile = isMobileUserAgent(userAgent);
  const target = isMobile ? "/mobile" : "/desktop";

  redirect(target);
}
