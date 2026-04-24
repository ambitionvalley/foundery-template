export default function RootLoading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white"
      aria-busy="true"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-pulse rounded-full bg-black/10"
        aria-hidden
      />
    </div>
  );
}
