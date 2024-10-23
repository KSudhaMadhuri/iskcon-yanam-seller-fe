import React, { useState, useContext, useEffect } from 'react'
import "./orders.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { userContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const OrderOverView = () => {
    const api = import.meta.env.VITE_API;
    const [singleOrder, setSingleOrder] = useState([]);
    const [delSpin, setDeSpin] = useState("");
    const { token, orders } = useContext(userContext);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState("");
    const [totalQty, setTotalQty] = useState("")
    const [totalcharges, setTotalCharges] = useState("")
    const [submitSpin, setSubmitSpin] = useState(false)
    const [trackNum, setTrackNum] = useState("")
    const [mailCard, setMailCard] = useState(false)
    const [itemsAmount , setItemsAmount] = useState("")
    const { id } = useParams()

    // send mail function
    const sendMail = () => {
        setMailCard(true)
    }

    const formData = {
        to: singleOrder.email,
        subject: "ISKCON YANAM STORES - Order Shipped Successfully",
        html: `
        <h2>Dear ${singleOrder.fullName},</h2>
        <p>We are delighted to inform you that your order from <strong>ISKCON YANAM STORES</strong> has been successfully shipped!</p>
        
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Customer Name:</strong> ${singleOrder.fullName}</li>
          <li><strong>Customer Email:</strong> ${singleOrder.email}</li>
        
        </ul>
    
        <h3>Shipping Address:</h3>
        <p>
          ${singleOrder.city},<br>
          ${singleOrder.address}, ${singleOrder.state} - ${singleOrder.pin},<br>
        
        </p>
    
        <p>You can track your order on our website using the tracking number below by visiting the following link:</p>
          
        <h4><strong>Tracking Number:</strong> ${trackNum}</h4>
        
        <p><a href="https://example.com">Track Your Order Here</a></p>
    
        <p>Thank you for shopping with us, and we hope you enjoy your purchase!</p>
        <br>
        <p>Sincerely,</p>
        <p><strong>ISKCON YANAM STORES</strong></p>
      `,
    };

    // sending mail function
    const submitFunc = async () => {
        if (trackNum) {
            setSubmitSpin(true);
            try {
                const res = await axios.post(`${api}/mail/sendmail`, formData);
                if (res) {
                    toast.success(
                        "Email has been Sent Successfully."
                    );
                    setSubmitSpin(false);
                    setMailCard(false)
                    setTrackNum("")
                }
            } catch (error) {
                console.log(error);
                toast.error("Please try again");
                setSubmitSpin(false);
            }
        } else {
            toast.error("Please Enter Tracking Number")
        }
    };


    useEffect(() => {

        //Calculating total Amount function logic
        const getTotalAmount = () => {

            let totalAmount = 0;

            const orderTotal = singleOrder.orderedBooks.reduce((acc, book) => {
                return acc + parseInt(book.bookPrice * book.qty);
            }, 0);
            totalAmount += orderTotal
            setItemsAmount(totalAmount)

            // total books quantity calclulating function 
            let tQty = 0;
            const orderQty = singleOrder.orderedBooks.reduce((acc, item) => {
                return acc + parseInt(item.qty)
            }, 0)
            tQty += orderQty
            setTotalQty(tQty)

            // caluculating total grams 
            let totalGrams = 0
            const totalBookGrams = singleOrder.orderedBooks.reduce((acc, item) => {
                return acc + parseInt(item.bookWeight * item.qty)
            }, 0)

            totalGrams += totalBookGrams
            const gramsAmount = totalGrams / 100
            const amountWithGst = gramsAmount * 1.20
            setTotalCharges(amountWithGst + 17)
            const totalAmountWithCharges = amountWithGst + totalAmount + 17
            setTotalPrice(totalAmountWithCharges.toLocaleString('en-IN'));
        }
        if (singleOrder.orderedBooks?.length > 0) {
            getTotalAmount()
        }

    }, [singleOrder])

    // finding single order by id
    useEffect(() => {
        const fetchOrders = async () => {
            const findOrder = orders.find((item) => item._id === id)
            setSingleOrder(findOrder)
        }
        fetchOrders();
    }, [id]);

    // delete order function
    const deleteOrder = async (orderId) => {
        const confirmOrder = confirm(
            "Order will be deleted permanently, Are you sure?"
        );
        if (confirmOrder) {

            setDeSpin(true);
            try {
                const response = await axios.delete(`${api}/order/delorder/${orderId}`);
                if (response) {
                    toast.success("Order deleted successfully");
                    setDeSpin(false);

                    setTimeout(() => {
                        navigate("/orders")
                    }, 100);
                }
            } catch (error) {
                console.error(error);
                toast.error("Please try again");
                setDeSpin(false);
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
                theme='dark'
            />

            <div className="checkout-page mt-10 px-2  pt-10">

                <>
                    <h5 className="text-2xl mb-2 font-bold text-center">
                        Order from : {singleOrder.fullName}
                    </h5>

                    <>
                        <div
                            key={singleOrder._id}
                            className="checkout-container  rounded bg-white "
                        >
                            <div className="address-section  flex flex-wrap justify-between ">
                                <div>

                                    <h2 className="font-semibold mb-3">
                                        PERSONAL DETAILS AND ADDRESS
                                    </h2>

                                    <p className="font-semibold mb-1">
                                        Name :
                                        <span className="font-normal pl-1">{singleOrder.fullName}</span>
                                    </p>
                                    <p className="font-semibold mb-1">
                                        Email :
                                        <span className="font-normal pl-1">{singleOrder.email}</span>
                                    </p>
                                    <p className="font-semibold mb-1">
                                        Phone :
                                        <span className="font-normal pl-1">{singleOrder.phone}</span>
                                    </p>
                                    <p className="font-semibold mb-1">
                                        Address :
                                        <span className="font-normal pl-1">{singleOrder.address}</span>
                                    </p>
                                    <p className="font-semibold mb-1">
                                        City :
                                        <span className="font-normal pl-1">{singleOrder.city}</span>
                                    </p>
                                    <p className="font-semibold mb-1">
                                        Pin Code :
                                        <span className="font-normal pl-1">{singleOrder.pin}</span>
                                    </p>
                                    <p className="font-semibold mb-1">
                                        State :
                                        <span className="font-normal pl-1">{singleOrder.state}</span>
                                    </p><p className="font-semibold mb-1">
                                        Delivery Mode :
                                        <span className="font-normal pl-1">{singleOrder.orderMode}</span>
                                    </p>
                                    <h3 className="font-semibold mb-3 mt-3">
                                        NUMBER OF ITEMS:
                                        <span className="font-normal pl-1">
                                            {singleOrder.orderedBooks?.length > 0 && singleOrder.orderedBooks.length}

                                        </span>
                                    </h3>
                                    <h3 className="font-semibold mb-3 mt-3">
                                        TOTAL QUANTITY :
                                        <span className="font-normal pl-1">{totalQty}</span>
                                    </h3>
                                </div>
                                <div className="address-selection sm:flex sm:flex-col sm:justify-start ">
                                    <div className="sm:text-center">
                                        <h2 className="font-semibold mb-3">
                                            PAYMENT RECEIPT
                                        </h2>
                                        <div className="h-64 overflow-y-auto">

                                            <img
                                                src={singleOrder.paymentScreenShot}
                                                alt="receipt"
                                                className="mt-5 w-52 rounded"
                                            />
                                        </div>
                                        <h5 className="font-semibold mt-3 cost-details ">
                                            Total items Amount :
                                            <span className="text-black pl-1">₹{ itemsAmount.toLocaleString("en-IN")}</span>
                                        </h5>
                                        <h5 className="font-semibold mt-3 cost-details ">
                                            Total Charges :
                                            <span className="text-black pl-1">₹{orderMode === "takeaway" ?  "0" : totalcharges.toLocaleString("en-IN")}</span>
                                        </h5>
                                        <h3 className="font-semibold mt-3 cost-details ">
                                            TOTAL COST :
                                            <span className="text-black pl-1">₹{totalPrice.toLocaleString("en-IN")}</span>
                                        </h3>


                                        <p className="font-semibold mb-1 mt-1">
                                            Ordered Date On :
                                            <span className="font-normal pl-1">
                                                {singleOrder.orderedDate}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-section pb-3">
                                <h2 className="font-semibold mb-4 ">
                                    ORDER BOOK DETAILS
                                </h2>
                                <div className="order-section w-full border border-gray-400">

                                    {singleOrder.orderedBooks?.length > 0 ? <>

                                        {singleOrder.orderedBooks.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex gap-3 border-b-2 py-3 border-gray-400"
                                            >
                                                <img
                                                    src={item.bookImage}
                                                    className="h-52 w-52 rounded"
                                                    alt="Book 1"
                                                />
                                                <div>
                                                    <p className="font-semibold h-32 overflow-auto">
                                                        Book Name :
                                                        <span className="font-medium text-black pl-1">
                                                            {item.bookName}
                                                        </span>
                                                    </p>
                                                    <p className="font-semibold">
                                                        Price :
                                                        <span className="font-medium text-black pl-1">
                                                            ₹{item.bookPrice}
                                                        </span>
                                                    </p>
                                                    <p className="font-semibold">
                                                        Quantity :
                                                        <span className="font-medium text-black pl-1">
                                                            {item.qty}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </> : ""}

                                </div>
                                {delSpin ? (
                                    <button className="mt-4 mr-4 bg-red-600 text-white w-36 h-10 rounded">
                                        Deleting order...
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => deleteOrder(singleOrder._id)}
                                        className="mt-4 mr-4 bg-red-600 text-white w-36 h-10 rounded"
                                    >
                                        Delete Order
                                    </button>
                                )}
                                <button
                                    onClick={() => sendMail(singleOrder._id)}
                                    className="mt-4 bg-gray-600 text-white w-36 h-10 rounded"
                                > Send Mail
                                </button>
                            </div>
                        </div>
                    </>
                </>
            </div>

            {/* mail card  */}
            {mailCard &&
                <div onClick={() => setMailCard(false)} className="fixed top-0 left-0 px-3 bg-gray-700 o bg-opacity-50 w-screen h-screen flex justify-center items-center">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded w-[20rem]">
                        <h5 className="mb-2 text-lg font-semibold">Track Number</h5>
                        <input type="text" className="pl-4 h-10 w-full mb-3 outline-none rounded-full border-2  border-orange-600" name="trackNumn" placeholder='Ex : abc12334' value={trackNum} onChange={(e) => setTrackNum(e.target.value)} />
                        {submitSpin ?
                            <button className="bg-blue-700 text-white h-8 w-[8rem] rounded-full">Sending...</button>
                            :
                            <button onClick={submitFunc} className="bg-blue-700 text-white h-8 w-[8rem] rounded-full">Send Mail</button>
                        }
                        <button onClick={() => setMailCard(false)} className="bg-gray-600 ml-2 text-white h-8 w-[6rem] rounded-full">Close</button>

                    </div>
                </div>
            }

        </>
    )
}

export default OrderOverView