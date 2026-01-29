import { useScreenShare } from "../hooks/useScreenShare";

export default function ScreenTest() {
  const { status, start, stop, stream, videoRef } = useScreenShare();

  const track = stream?.getVideoTracks()[0];
  const settings = track?.getSettings();
  const isTabShare = settings?.displaySurface === "browser";

  const canStart =
    status === "idle" ||
    status === "denied" ||
    status === "cancelled" ||
    status === "error" ||
    status === "stopped";

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-900">
            Screen Share Test
          </h1>
          <p className="text-sm text-gray-500">
            Browser screen-sharing diagnostics
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-6">

          {/* START / RETRY BUTTON */}
          {canStart && (
            <div className="flex justify-center">
              <button
                onClick={start}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium
                           hover:bg-blue-700 transition"
              >
                Start Screen Share
              </button>
            </div>
          )}

          {/* STATUS MESSAGES */}
          <div className="text-center min-h-[24px] text-sm font-medium">
            {status === "requesting" && (
              <span className="text-blue-600">
                Requesting screen permission…
              </span>
            )}
            {status === "denied" && (
              <span className="text-red-600">
                Permission denied by user
              </span>
            )}
            {status === "cancelled" && (
              <span className="text-yellow-600">
                Screen picker cancelled
              </span>
            )}
            {status === "error" && (
              <span className="text-red-700">
                An unexpected error occurred
              </span>
            )}
          </div>

          {/* ACTIVE STATE */}
          {status === "granted" && stream && (
            <div className="space-y-4">

              {/* STATUS BADGE */}
              <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-green-600 animate-pulse"></span>
                Screen sharing active
              </div>

              {/* TAB SHARE WARNING (NO PREVIEW) */}
              {isTabShare && (
                <div className="text-center bg-orange-50 border border-orange-200
                                text-orange-700 px-4 py-3 rounded-lg text-sm">
                  ⚠️ You are sharing <b>This Tab</b>.  
                  Live preview is hidden to prevent infinite mirroring.  
                  Please share a <b>Window</b> or <b>Entire Screen</b>.
                </div>
              )}

              {/* LIVE PREVIEW (ONLY FOR WINDOW / SCREEN) */}
              {!isTabShare && (
                <>
                  <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full max-h-[75vh] object-contain"
                    />

                    {/* RESOLUTION OVERLAY */}
                    {settings && (
                      <div className="absolute bottom-3 right-3 bg-black/70
                                      text-white text-xs px-3 py-1 rounded">
                        {settings.width} × {settings.height}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 text-center">
                    Live preview (window / screen share)
                  </p>
                </>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
