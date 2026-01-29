import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScreenTest from "./pages/ScreenTest";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screen-test" element={<ScreenTest />} />
      </Routes>
    </BrowserRouter>
  );
}
