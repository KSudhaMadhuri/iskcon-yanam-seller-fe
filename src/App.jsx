import { createContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./assets/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./assets/LogIn";
import SignUP from "./assets/SignUP";
import Products from "./assets/Products";
import Home from "./assets/Home";
import Orders from "./assets/Orders";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./assets/Welcome";
import axios from "axios";
import Admin from "./assets/Admin";

export const userContext = createContext();
function App() {
  const api = import.meta.env.VITE_API;
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([])
  const [update, setUpdate] = useState(false);


  //Retrieving token from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    }
  }, []);

  //fetching seller details from server
  useEffect(() => {
    const getSeller = async () => {
      try {
        const response = await axios.get(`${api}/seller/getseller`, {
          headers: {
            token: token,
          },
        });
        if (response) {
          setUser(response.data.getSeller);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSeller();
  }, [token]);

  // fetching books data from server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/book/getbooks`)
        if (response) {
          setProducts(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBooks()
  }, [update])

  return (
    <>
      <userContext.Provider value={{ token, setToken, user, setUser , products, setProducts,update, setUpdate }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {user && user.role === "admin" ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
              </>
            ) : ""}
            {user && user.admin === "admin" && (
              <Route path="/admin" element={<Admin />} />
            )}

            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUP />} />


            <Route path="/welcome" element={<Welcome />} />

          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
