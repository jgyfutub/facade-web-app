import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
