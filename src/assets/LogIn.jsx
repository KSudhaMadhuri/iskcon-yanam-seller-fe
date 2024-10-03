import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useContext,useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { userContext } from "../App";

const LogIn = () => {
  const api = import.meta.env.VITE_API;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(false);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const { token, setToken } = useContext(userContext);

  //form Submitting function to the server
  const formSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const response = await axios.post(`${api}/seller/loginseller`, {
        email,
        password,
      });
      if (response) {
        toast.success(" Logged in Successfully");
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setToken(response.data.token);
        setSpinner(false);
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong Email Or Password");
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/welcome");
      }, 1500);
        }
  }, [token, navigate]);

  return (
    <>
      <ToastContainer
        position="top-center"
        toastClassName="bg-black text-white"
      />
      <div className=" mt-6 flex min-h-full flex-col justify-center px-6 py-24 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            className="mx-auto h-20 w-auto"
            src="/iskcon_logo.jpg"
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log In to Seller Account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6" onSubmit={formSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter email address"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passwordToggle ? "text" : "password"}
                  required
                  minLength={6}
                  maxLength={6}
                  value={password.trim()}
                  placeholder="Enter password"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordToggle ? (
                  <span
                    className="eye-open"
                    onClick={() => {
                      setPasswordToggle(false);
                    }}
                  >
                    <FaEye />
                  </span>
                ) : (
                  <span
                    className="eye-close"
                    onClick={() => {
                      setPasswordToggle(true);
                    }}
                  >
                    <FaEyeSlash />
                  </span>
                )}
              </div>
            </div>
            <div>
              {spinner ? (
                <button
                  type="button"
                  className=" bg-gradient-to-r  w-full justify-center  from-indigo-600 to-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600   rounded-md flex items-center"
                  disabled
                >
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Logging in...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r flex w-full justify-center rounded-md from-indigo-600 to-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              )}
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an Account ?
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogIn;
