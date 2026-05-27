export default function Loading() {
  return (
    <div className="px-5 sm:px-8 pt-32 pb-20 max-w-6xl mx-auto">
      <div className="space-y-4 animate-pulse">
        <div className="h-4 w-32 rounded-full bg-ink-100" />
        <div className="h-12 w-3/4 rounded-2xl bg-ink-100" />
        <div className="h-12 w-2/3 rounded-2xl bg-ink-100" />
        <div className="h-6 w-1/2 rounded-full bg-ink-100" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-8">
          <div className="h-32 rounded-2xl bg-ink-100" />
          <div className="h-32 rounded-2xl bg-ink-100" />
          <div className="h-32 rounded-2xl bg-ink-100" />
        </div>
      </div>
    </div>
  );
}
