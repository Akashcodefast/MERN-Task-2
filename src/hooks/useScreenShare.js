import { useState, useRef, useEffect } from "react";

export function useScreenShare() {
  const [status, setStatus] = useState("idle");
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const start = async () => {
    setStatus("requesting");
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      setStream(mediaStream);
      setStatus("granted");

      const track = mediaStream.getVideoTracks()[0];
      track.onended = stop;

    } catch (err) {
      if (err.name === "NotAllowedError") {
        setStatus("denied");
      } else if (err.name === "AbortError") {
        setStatus("cancelled");
      } else {
        setStatus("error");
      }
    }
  };

  const stop = () => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
    setStatus("stopped");
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => () => stop(), []);

  return { status, start, stop, stream, videoRef };
}
