import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { brand } from "@/config/brand";

export const metadata = { title: "Create workspace" };

export default function OnboardingPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-white p-8">
      <section className="flex w-full max-w-[420px] flex-col items-center gap-6 rounded-[24px] bg-white p-8">
        <BrandLogo variant="mark" size={64} priority />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[24px] leading-[32px] font-semibold text-black">
            Create your workspace
          </h1>
          <p className="text-[14px] leading-[20px] text-black/60">
            Your workspace URL will be {brand.name.toLowerCase()}.com/&lt;slug&gt;.
          </p>
        </div>
        <form
          className="flex w-full flex-col gap-3"
          action="/onboarding"
          method="post"
        >
          <Input
            size="lg"
            type="text"
            name="name"
            autoComplete="organization"
            placeholder="Workspace name"
            aria-label="Workspace name"
          />
          <Input
            size="lg"
            type="text"
            name="slug"
            autoComplete="off"
            placeholder="your-workspace"
            aria-label="Workspace slug"
            pattern="[a-z0-9][a-z0-9-]{1,30}[a-z0-9]"
          />
          <Button
            type="submit"
            size="large"
            variant="filled"
            radius={16}
            className="mt-2"
          >
            Create workspace
          </Button>
        </form>
      </section>
    </main>
  );
}
