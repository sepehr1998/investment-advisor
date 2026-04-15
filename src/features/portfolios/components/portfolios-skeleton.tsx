const SKELETON_COUNT = 4;

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-lg bg-slate-100" />
        <div className="min-w-0 flex-1">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
          <div className="mt-3 flex justify-between border-t border-slate-100 pt-3">
            <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfoliosSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
