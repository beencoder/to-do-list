import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Reset } from 'styled-reset'
// import './App.css';

//   document.cookie = "safeCookie1=foo; SameSite=Lax"; 
// document.cookie = "safeCookie2=foo";  
//   document.cookie = "crossCookie=bar; SameSite=None; Secure";

const App = () => {
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Reset />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
