import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RobotsListPage from "./components/RobotsListPage";
import RobotDetailPage from "./components/RobotDetailPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/robots" element={<RobotsListPage />} />
        <Route path="/robots/:id" element={<RobotDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;


