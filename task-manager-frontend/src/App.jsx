import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";   // your login page
import Home from "./Home";     // create a simple home page

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* Home Route */}
        <Route path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;