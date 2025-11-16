import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import EncryptPage from "./EncryptPage";
import DecryptPage from "./DecryptPage";
import About from "./About"; // ⬅️ new import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encrypt" element={<EncryptPage />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        <Route path="/about" element={<About />} /> {/* ⬅️ new route */}
      </Routes>
    </Router>
  );
}

export default App;
