export default function AppLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <div className="h-8 w-40 animate-pulse rounded-[8px] bg-black/[0.04]" />
      <div className="flex gap-7">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 flex-1 animate-pulse rounded-[16px] bg-black/[0.04]"
          />
        ))}
      </div>
      <div className="grid grid-cols-[662fr_202fr] gap-7">
        <div className="h-64 animate-pulse rounded-[16px] bg-black/[0.04]" />
        <div className="h-64 animate-pulse rounded-[16px] bg-black/[0.04]" />
      </div>
    </div>
  );
}
