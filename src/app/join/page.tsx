import { getJoinPath } from "@/content/join";
import { PageShell } from "@/components/layout/PageShell";
import { JoinFlow } from "@/components/join/JoinFlow";

type Props = { searchParams: Promise<{ path?: string | string[] }> };

export default async function JoinPage({ searchParams }: Props) {
  const { path } = await searchParams;
  const initialPath = getJoinPath(typeof path === "string" ? path : undefined)?.id;

  return (
    <PageShell>
      <div className="pm-container max-w-4xl py-10 sm:py-16">
        <p className="pm-eyebrow">Join the Movement</p>
        <h1 className="mt-3 font-display text-display-md font-extrabold text-balance">
          Tell us how you’d like to contribute
        </h1>
        <p className="mt-4 max-w-2xl text-pm-text-secondary">
          Four short steps, about three minutes. Your answers stay on this page until you submit, so you can go back and
          change anything.
        </p>
        <div className="mt-10">
          <JoinFlow key={initialPath ?? "none"} initialPath={initialPath} />
        </div>
      </div>
    </PageShell>
  );
}
