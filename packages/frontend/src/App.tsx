// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/Main";
import Home from "./pages/Home";
import Results from "./pages/Results";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/results/:uuid" element={<Results />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
