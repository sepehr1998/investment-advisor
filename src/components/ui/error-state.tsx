import { TRY_AGAIN_BUTTON } from '../../lib/constants';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  retryLabel?: string;
}

export function ErrorState({ message, onRetry, retryLabel = TRY_AGAIN_BUTTON }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 py-12">
      <svg
        className="h-12 w-12 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p className="mt-4 text-sm text-red-600">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        {retryLabel}
      </button>
    </div>
  );
}
