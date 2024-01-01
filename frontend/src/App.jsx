import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
