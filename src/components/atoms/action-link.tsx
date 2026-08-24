import Link from "next/link";

export function ActionLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link href={href} className={`inline-flex items-center justify-center border px-5 py-3 text-[11px] font-semibold uppercase tracking-[.14em] ${dark ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--ink)]"}`}>{children}</Link>;
}
