import { useScreenShare } from "../hooks/useScreenShare";

export default function ScreenTest() {
  const { status, start, stream, videoRef } = useScreenShare();

  const canStart =
    status === "idle" ||
    status === "denied" ||
    status === "cancelled" ||
    status === "error" ||
    status === "stopped";

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Screen Share Test
        </h1>

        <p className="text-gray-500">
          Browser screen-sharing diagnostics
        </p>

        {/* ACTION */}
        {canStart && (
          <button
            onClick={start}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Screen Share
          </button>
        )}

        {/* STATUS */}
        {status === "requesting" && (
          <p className="text-blue-600">Requesting permission…</p>
        )}

        {status === "denied" && (
          <p className="text-red-600">Permission denied</p>
        )}

        {status === "cancelled" && (
          <p className="text-yellow-600">Screen picker cancelled</p>
        )}

        {status === "error" && (
          <p className="text-red-700">An unexpected error occurred</p>
        )}

        {status === "granted" && (
          <p className="text-green-600 font-medium">
            ✅ Screen sharing active
          </p>
        )}

        {/* INLINE PREVIEW */}
        {status === "granted" && stream && (
          <div className="mt-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-h-[500px] rounded-lg border bg-black object-contain"
            />
          </div>
        )}

      </div>
    </div>
  );
}
