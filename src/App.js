import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import EncryptPage from "./EncryptPage";
import DecryptPage from "./DecryptPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encrypt" element={<EncryptPage />} />
        <Route path="/decrypt" element={<DecryptPage />} />
      </Routes>
    </Router>
  );
}

export default App;
