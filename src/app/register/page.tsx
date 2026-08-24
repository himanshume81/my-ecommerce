import { AuthForm } from "@/components/organisms/auth-form";
import { PageShell } from "@/components/common/page-shell";

export default function RegisterPage() { return <PageShell><section className="mx-auto max-w-md px-5 py-20 md:py-32"><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--clay)]">A better everyday</p><h1 className="mb-4 font-serif text-5xl tracking-[-.05em]">Join Morrow.</h1><p className="mb-10 text-sm leading-6 text-[var(--muted)]">Create an account to save your details and follow your orders.</p><AuthForm register /></section></PageShell>; }
