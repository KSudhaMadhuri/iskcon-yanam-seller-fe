import React, { useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";

const Welcome = () => {
  const { user ,token} = useContext(userContext);
  const navigate = useNavigate();
 
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
    else if(user && user.role === "admin") {
      navigate("/");

    } 
  }, [navigate,user ,token]);

  return (
    <section className={user.role === "admin" ? "hidden":"text-gray-600 body-font mt-10"}>
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="w-36 mb-5 object-cover object-center rounded"
          alt="hero"
          src="/iskcon_logo.jpg"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium  text-gray-900">
            Welcome to Iskcon Yanam
          </h1>
          <p className="mb-8 leading-relaxed">
            Waiting for admin approval once admin approved you will be
            maintained seller account.
          </p>
          <div className="flex justify-center">
            <a href="mailto:iskconyanamstores@gmail.com" className="flex justify-center items-center gap-2  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
             <MdOutlineMailOutline size={23} /> Contact admin
            </a>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Welcome;
