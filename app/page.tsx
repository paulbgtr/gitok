import { IsUp } from "@/components/is-up";

const GITHUB_STATUS_ENDPOINT =
  "https://www.githubstatus.com/api/v2/status.json";

type GitHubStatusResponse = {
  status?: {
    indicator?: "none" | "minor" | "major" | "critical";
    description?: string;
  };
};

async function getGitHubStatus() {
  try {
    const response = await fetch(GITHUB_STATUS_ENDPOINT, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`GitHub status fetch failed: ${response.status}`);
    }

    const data = (await response.json()) as GitHubStatusResponse;
    const indicator = data.status?.indicator ?? "major";
    const status =
      indicator === "none"
        ? "up"
        : indicator === "minor"
          ? "partial"
          : "down";

    return {
      status,
      description: data.status?.description ?? "Status unavailable",
    };
  } catch {
    return {
      status: "down" as const,
      description: "Status unavailable",
    };
  }
}

export default async function Page() {
  const githubStatus = await getGitHubStatus();

  return (
    <main className="min-h-screen">
      <IsUp
        serviceName="GitHub"
        status={githubStatus.status}
        subtext={githubStatus.description}
      />
    </main>
  );
}
