import { useState } from "react";
import "./App.css";
import Navbar from "./assets/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./assets/LogIn";
import SignUP from "./assets/SignUP";
import Products from "./assets/Products";
import Home from "./assets/Home"
import Orders from "./assets/Orders"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUP/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
