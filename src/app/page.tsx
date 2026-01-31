import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root to the demo tenant 'slict'
  // In a real multi-tenant app, this might show a platform landing page
  // or redirect based on subdomain if using custom domains.
  redirect("/slict");
}
