import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import DearYou from "./pages/DearYou";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dearyou/" element={<DearYou />} />
        <Route path="/about/" element={<div></div>} /> //TODO: Add about page
      </Routes>
    </>
  );
}

export default App;
