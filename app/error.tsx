'use me';
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // If browser fails to load dynamic JS/CSS chunks from an older build, force a clean reload
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      error?.message?.includes('Loading chunk') ||
      error?.message?.includes('net::ERR_ABORTED') ||
      error?.message?.includes('404');

    if (isChunkError) {
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-bold text-neutral-200">Updating application...</h2>
      <p className="mt-2 text-sm text-neutral-400">
        We detected a newer version. Reloading the page for you.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black"
      >
        Reload Page
      </button>
    </div>
  );
}