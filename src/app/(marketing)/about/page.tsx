export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <h1 className="text-[32px] leading-[40px] font-semibold text-black">
        About
      </h1>
      <p className="text-[14px] leading-[20px] text-black/60">
        Replace this with your company story.
      </p>
    </section>
  );
}
