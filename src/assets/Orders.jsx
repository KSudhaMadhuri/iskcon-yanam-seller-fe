import React, { useContext, useEffect, useState } from "react";
import "./orders.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { userContext } from "../App";
import { Link, useNavigate } from "react-router-dom";


const Orders = () => {
  const api = import.meta.env.VITE_API;
  const { token, orders, setOrders } = useContext(userContext);
  const navigate = useNavigate();
  const [orderSpin, setOrderSpin] = useState(false);



  // fetching orders
  useEffect(() => {
    const fetchOrders = async () => {
      setOrderSpin(true);
      try {
        const response = await axios.get(`${api}/order/getorder`);
        if (response) {
          setOrders(response.data.reverse());
          setOrderSpin(false);
        }
      } catch (error) {
        console.error(error);
        setOrderSpin(false);
      }
    };

    fetchOrders();
  }, []);

   

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        toastClassName="bg-black text-white"
      />
      {orderSpin ? (
        <div className="mt-24 pt-10 flex justify-center items-center w-full h-full font-semibold text-xl">
          Fetching Orders...
        </div>
      ) : (
        <div className="checkout-page mt-10 px-4  pt-10">
          {orders.length ? (
            <>
              <h5 className="text-2xl mb-2 font-bold text-center">
                Total Orders : {orders.length}
              </h5>
              {orders.map((item, index) => (
                <>
                  <Link to={`/orders/${item._id}`}
                    key={item._id}
                    className="checkout-container  rounded "
                  >
                    <div className="address-section p-4 flex flex-wrap justify-between ">
                      <div>
                        <h3 className="font-semibold mb-3 text-xl bg-indigo-600 pl-2 text-white flex items-center  rounded h-9 w-fit pr-2">
                          {index + 1}. Order from : {item.fullName}
                        </h3>



                        <p className="font-semibold mb-1">
                          Name :
                          <span className="font-normal pl-1">{item.fullName}</span>
                        </p>

                        <p className="font-semibold mb-1">
                          Phone :
                          <span className="font-normal pl-1">{item.phone}</span>
                        </p>
                        <p className="font-semibold mb-1">
                          Order Mode :
                          <span className="font-normal ml-1 bg-orange-700 px-1 py-1 rounded text-white">{item.orderMode}</span>
                        </p>


                        <p className="font-semibold ">
                          Ordered On :
                          <span className="font-normal pl-1">
                            {item.orderedDate}
                          </span>
                        </p>


                      </div>

                    </div>

                  </Link>
                </>
              ))}
            </>
          ) : (
            <div
              className="text-center mt-10 pt-10 font-semibold text-xl w-full "
              style={{ height: "100vh" }}
            >
              No orders
            </div>
          )}
        </div>
      )}


    </>
  );
};

export default Orders;
