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
import OrderOverView from "./assets/OrderOverView";

export const userContext = createContext();
function App() {
  const api = import.meta.env.VITE_API;
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [renderWelcome, setRenderWelcome] = useState(false);
  const [orders, setOrders] = useState([])



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
      setRenderWelcome(true);
      try {
        const response = await axios.get(`${api}/seller/getseller`, {
          headers: {
            token: token,
          },
        });
        if (response) {
          setUser(response.data.getSeller);
          setRenderWelcome(false);
        }
      } catch (error) {
        console.log(error);
        setRenderWelcome(true);
      }
    };
    getSeller();
  }, [token]);

  // fetching books data from server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/book/getbooks`);
        if (response) {
          setProducts(response.data.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, [update]);

  return (
    <>
      <userContext.Provider
        value={{
          token,
          setToken,
          user,
          setUser,
          products,
          setProducts,
          update,
          setUpdate,
          renderWelcome,
          orders,
          setOrders
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            {user && user.role === "admin" ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders/:id" element={<OrderOverView />} />
              </>
            ) : (
              ""
            )}
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
