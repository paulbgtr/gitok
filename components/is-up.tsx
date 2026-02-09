import { cn } from "@/lib/utils";
import { Status } from "@/lib/types/status";

type IsUpProps = {
  serviceName?: string;
  status: Status;
  subtext?: string;
};

export function IsUp({ serviceName = "GitHub", status, subtext }: IsUpProps) {
  const isUp = status === "up";
  const isPartial = status === "partial";
  const label = isUp ? "Yes" : isPartial ? "Kinda" : "No";

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.38em] text-muted-foreground sm:text-base">
        <span
          aria-hidden
          className={cn(
            "h-3 w-3 rounded-full",
            isUp
              ? "bg-status-up shadow-[0_0_24px_8px_var(--status-up-glow)]"
              : isPartial
                ? "bg-status-partial shadow-[0_0_24px_8px_var(--status-partial-glow)]"
                : "bg-status-down shadow-[0_0_24px_8px_var(--status-down-glow)]",
          )}
        />
        <span>{`Is ${serviceName} up?`}</span>
      </div>

      <div className="relative mb-6 sm:mb-8">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 rounded-[50%] blur-3xl",
            isUp
              ? "bg-status-up opacity-30"
              : isPartial
                ? "bg-status-partial opacity-30"
                : "bg-status-down opacity-30",
          )}
        />
        <h1
          className={cn(
            "text-[clamp(5rem,22vw,13rem)] font-black leading-[0.9] tracking-[-0.04em]",
            isUp
              ? "text-status-up drop-shadow-[0_0_36px_var(--status-up-glow)]"
              : isPartial
                ? "text-status-partial drop-shadow-[0_0_36px_var(--status-partial-glow)]"
                : "text-status-down drop-shadow-[0_0_36px_var(--status-down-glow)]",
          )}
        >
          {isUp ? (
            <>
              {label}
              <span className="align-top text-[0.5em] text-foreground/40">
                *
              </span>
            </>
          ) : (
            label
          )}
        </h1>
      </div>

      <p className="text-lg italic text-display-muted sm:text-4xl">
        {subtext ??
          (isUp
            ? "Quick, get some work in"
            : isPartial
              ? "Some services are degraded"
              : "Take a break while they fix it")}
      </p>

      <p className="absolute bottom-6 text-sm text-display-subtle">* For now</p>
    </section>
  );
}
