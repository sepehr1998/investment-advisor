const SKELETON_COUNT = 8;

function SkeletonCard() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex-1">
        <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-24 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
    </div>
  );
}

export function ContactsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
