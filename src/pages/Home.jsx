import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const startTest = () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      alert("Screen sharing not supported in this browser");
      return;
    }
    navigate("/screen-test");
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <button
        onClick={startTest}
        className="px-8 py-4 bg-white text-black rounded-xl text-lg font-medium hover:scale-105 transition"
      >
        Start Screen Test
      </button>
    </div>
  );
}
