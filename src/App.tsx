import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import DearYou from "./pages/DearYou";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dearyou/" element={<DearYou />} />
        <Route path="/about/" element={<div></div>} /> //TODO: Add about page
      </Routes>
    </>
  );
}

export default App;
