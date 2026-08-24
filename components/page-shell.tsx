import { SiteHeader } from "./site-header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[var(--background)]"><div className="grain fixed inset-0 z-0" /><div className="relative z-10"><SiteHeader />{children}</div></main>;
}
