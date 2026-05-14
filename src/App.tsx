import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import DearYou from "./pages/DearYou";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dearyou" element={<DearYou />} />
      </Routes>
    </>
  );
}

export default App;
