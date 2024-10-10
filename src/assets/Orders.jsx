import React, { useContext, useEffect, useState } from "react";
import "./orders.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";


const Orders = () => {
  const api = import.meta.env.VITE_API;
  const [orders, setOrders] = useState([]);
  const [delSpin, setDeSpin] = useState("");
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [orderSpin, setOrderSpin] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [totalQty, setTotalQty] = useState("")
  const [userDetails, setUserDetails] = useState({})
  const [amountDetailsToggle, setAmountDetailsToggle] = useState("")


  // send mail function

  const sendMail = (orderId) => {
    const user = orders.find((item) => item._id === orderId)
    setUserDetails(user)
  }

  //Calculating total Amount function logic
  const getTotalAmount = (orderId) => {
    setAmountDetailsToggle(orderId)
    let totalAmount = 0;

    const findOrder = orders.find((order) => {
      return order._id === orderId
    });
    const orderTotal = findOrder.orderedBooks.reduce((acc, book) => {
      return acc + parseInt(book.bookPrice * book.qty);
    }, 0);
    totalAmount += orderTotal
    setTotalPrice(totalAmount.toLocaleString('en-IN'));

    // total books quantity calclulating function 
    let tQty = 0;
    const orderQty = findOrder.orderedBooks.reduce((acc, item) => {
      return acc + parseInt(item.qty)
    }, 0)
    tQty += orderQty
    setTotalQty(tQty)
  }


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
  }, [update]);

  // delete order function
  const deleteOrder = async (orderId) => {
    const confirmOrder = confirm(
      "Order will be deleted permanently, Are you sure?"
    );
    if (confirmOrder) {
      setUpdate(true);
      setDeSpin(orderId);
      try {
        const response = await axios.delete(`${api}/order/delorder/${orderId}`);
        if (response) {
          const data = orders.filter((item) => {
            item._id !== orderId;
          });
          setOrders(data);
          toast.success("Order deleted successfully");
          setDeSpin("");
          setUpdate(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Please try again");
        setDeSpin("");
      }
    }
  };

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
        <div className="checkout-page mt-10 px-2  pt-10">
          {orders.length ? (
            <>
              <h5 className="text-2xl mb-2 font-bold text-center">
                Total Orders : {orders.length}
              </h5>
              {orders.map((item) => (
                <>
                  <div
                    key={item._id}
                    className="checkout-container  rounded bg-white "
                  >
                    <div className="address-section  flex flex-wrap justify-between ">
                      <div>
                        <h3 className="font-semibold mb-3 text-xl bg-indigo-600 pl-2 text-white flex items-center  rounded h-9 w-fit pr-2">
                          Order from : {item.fullName}
                        </h3>

                        <h2 className="font-semibold mb-3">
                          PERSONAL DETAILS AND ADDRESS
                        </h2>

                        <p className="font-semibold mb-1">
                          Name :
                          <span className="font-normal pl-1">{item.fullName}</span>
                        </p>
                        <p className="font-semibold mb-1">
                          Email :
                          <span className="font-normal pl-1">{item.email}</span>
                        </p>
                        <p className="font-semibold mb-1">
                          Phone :
                          <span className="font-normal pl-1">{item.phone}</span>
                        </p>
                        <p className="font-semibold mb-1">
                          Address :
                          <span className="font-normal pl-1">{item.address}</span>
                        </p>
                        <p className="font-semibold mb-1">
                          City :
                          <span className="font-normal pl-1">{item.city}</span>
                        </p>
                        <p className="font-semibold mb-1">
                          Pin Code :
                          <span className="font-normal pl-1">{item.pin}</span>
                        </p>
                        <p className="font-semibold mb-1">
                          State :
                          <span className="font-normal pl-1">{item.state}</span>
                        </p>
                        <h3 className="font-semibold mb-3 mt-3">
                          NUMBER OF ITEMS:
                          <span className="font-normal pl-1">
                            {item.orderedBooks.length}
                          </span>
                        </h3>
                        <h3 className="font-semibold mb-3 mt-3">
                          TOTAL QUANTITY :
                          {amountDetailsToggle === item._id && <span className="font-normal pl-1">{totalQty}</span>}
                        </h3>
                      </div>
                      <div className="address-selection sm:flex sm:flex-col sm:justify-start ">
                        <div className="sm:text-center">
                          <h2 className="font-semibold mb-3">
                            PAYMENT RECEIPT
                          </h2>
                          <img
                            src={item.paymentScreenShot}
                            alt="receipt"
                            className="mt-5 h-52 w-52 rounded"
                          />
                          {amountDetailsToggle === item._id ? <h3 className="font-semibold mt-3 cost-details ">
                            TOTAL COST :
                            <span className="text-black pl-1">₹{totalPrice}</span>
                          </h3> : <button
                            onClick={() => getTotalAmount(item._id)}
                            className="mt-4 bg-indigo-600 text-white w-36 h-10 rounded"
                          >
                            Get Details
                          </button>}


                          <p className="font-semibold mb-1 mt-1">
                            Ordered Date On :
                            <span className="font-normal pl-1">
                              {item.orderedDate}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="order-section pb-3">
                      <h2 className="font-semibold mb-4 ">
                        ORDER BOOK DETAILS
                      </h2>
                      <div className="order-section overflow-y-auto w-full h-64 border border-gray-400">
                        {item.orderedBooks.map((bookItem, index) => (
                          <div
                            key={index}
                            className="flex gap-3 border-b-2 py-3 border-gray-400"
                          >
                            <img
                              src={bookItem.bookImage}
                              className="h-52 w-52 rounded"
                              alt="Book 1"
                            />
                            <div>
                              <p className="font-semibold h-32 overflow-auto">
                                Book Name :
                                <span className="font-medium text-black pl-1">
                                  {bookItem.bookName}
                                </span>
                              </p>
                              <p className="font-semibold">
                                Price :
                                <span className="font-medium text-black pl-1">
                                  ₹{bookItem.bookPrice}
                                </span>
                              </p>
                              <p className="font-semibold">
                                Quantity :
                                <span className="font-medium text-black pl-1">
                                  {bookItem.qty}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {delSpin === item._id ? (
                        <button className="mt-4 mr-4 bg-red-600 text-white w-36 h-10 rounded">
                          Deleting order...
                        </button>
                      ) : (
                        <button
                          onClick={() => deleteOrder(item._id)}
                          className="mt-4 mr-4 bg-red-600 text-white w-36 h-10 rounded"
                        >
                          Delete Order
                        </button>
                      )}
                      <button
                        onClick={() => sendMail(item._id)}
                        className="mt-4 bg-gray-600 text-white w-36 h-10 rounded"
                      >
                        Send Mail
                      </button>
                    </div>
                  </div>
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
