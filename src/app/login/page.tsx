import { AuthForm } from "@/components/organisms/auth-form";
import { PageShell } from "@/components/common/page-shell";

export default function LoginPage() { return <PageShell><section className="mx-auto max-w-md px-5 py-20 md:py-32"><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--clay)]">Welcome back</p><h1 className="mb-10 font-serif text-5xl tracking-[-.05em]">Sign in.</h1><AuthForm /></section></PageShell>; }
