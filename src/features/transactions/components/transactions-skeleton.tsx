const HEADERS = ['Date', 'Type', 'Security', 'ISIN', 'Price', 'Currency', 'Status'];
const SKELETON_ROWS = 8;

function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100">
      {[70, 50, 120, 60, 70, 90, 50].map((width, i) => (
        <td key={i} className="px-4 py-3">
          <div
            className="h-4 animate-pulse rounded bg-slate-100"
            style={{ width: `${width}px` }}
          />
        </td>
      ))}
    </tr>
  );
}

export function TransactionsSkeleton() {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {HEADERS.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
