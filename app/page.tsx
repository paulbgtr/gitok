import { IsUp } from "@/components/is-up";

export default function Page() {
  // Placeholder state until API fetching is wired.
  const isGithubUp = true;

  return (
    <main className="min-h-screen">
      <IsUp serviceName="GitHub" isUp={isGithubUp} />
    </main>
  );
}
