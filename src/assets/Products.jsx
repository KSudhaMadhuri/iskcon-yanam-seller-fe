import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { FaRupeeSign, FaWindowClose, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";

const Products = () => {
  const api = import.meta.env.VITE_API;
  const { token, products, setProducts, setUpdate } = useContext(userContext);
  const [delSpin, setDeSpin] = useState(false);
  const navigate = useNavigate();
  const [bookId, setBookId] = useState("");
  const [data, setData] = useState({
    bookName: "",
    bookAuthor: "",
    bookPrice: "",
    bookImage: "",
    bookSummary: "",
    bookPages: "",
    bookLanguage: "",
    bookSize: "",
    bookWeight: "",
    outOfStock: "stock",
  });

  // delete books function
  const deleteBook = async (itemId) => {
    const confir = confirm(
      "Product will be deleted permanently, are you sure ?"
    );
    if (confir) {
      setDeSpin(true);
      try {
        const response = await axios.delete(`${api}/book/delbooks/${itemId}`);
        if (response) {
          setDeSpin(false);
          toast.success("Product deleted successfully");
          const remaining = products.filter((item) => item._id !== itemId);
          setProducts(remaining);
        }
      } catch (error) {
        console.log(error);
        setDeSpin(false);
        toast.error("Please try again");
      }
    }
  };

  const formHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // bookName update function
  const updateBook = async (formData) => {
    const ok = confirm("updating book details, are you sure?");
    if (ok) {
      setUpdate(false);
      try {
        const res = await axios.put(
          `${api}/book/updatebookdetails/${bookId}`,
          formData
        );
        if (res) {
          toast.success(`book details updated successfully`);
          setUpdate(true);
          setData({
            bookName: "",
            bookAuthor: "",
            bookPrice: "",
            bookImage: "",
            bookSummary: "",
            bookPages: "",
            bookLanguage: "",
            bookSize: "",
            bookWeight: "",
            outOfStock: "",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Please try again");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const updateModal = (bId) => {
    setBookId(bId);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        toastClassName="bg-black text-white"
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
      />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <h5 className="font-bold text-xl mb-4 text-end">
            Total Products : {products.length}
          </h5>
          <div className="-my-8 divide-y-2 divide-gray-100">
            {products.map((item) => (
              <div
                key={item._id}
                className="py-8 flex sm:gap-12 flex-wra gap-4 md:flex-nowrap"
              >
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col ">
                  <img
                    src={item.bookImage}
                    alt={item.bookName}
                    className="w-36 rounded sm:w-72 sm:h-72 relative"
                  />
                  {item.outOfStock === "outofstock" ? (
                    <button className="absolute   bg-red-600 w-36 text-white rounded h-9 hover:bg-yellow-400">
                      OUT OF STOCK
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => updateModal(item._id)}
                    className="block sm:hidden  bg-blue-600 mt-4 text-white rounded h-9 hover:bg-blue-900"
                  >
                    Update
                  </button>

                  {delSpin ? (
                    <button className=" block sm:hidden bg-red-600 mt-4 text-white rounded h-9 w-36 hover:bg-red-900">
                      Deleting...
                    </button>
                  ) : (
                    <button
                      onClick={() => deleteBook(item._id)}
                      className=" block sm:hidden bg-red-600 mt-4 text-white rounded h-9 w-36 hover:bg-red-900"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                    Item Name :{" "}
                    <span className="text-red-500">{item.bookName}</span>
                  </h2>
                  <h5 className="font-medium overflow-auto h-14 sm:h-34 sm:mb-2">
                    Summary :{" "}
                    <span className="text-red-500 font-medium ">
                      {item.bookSummary}
                    </span>
                  </h5>
                  <div className=" flex gap-2 items-center font-medium mb-2">
                    Item Price :
                    <span className="flex items-center">
                      <FaRupeeSign size={13} color="red" />
                      <h2 className="text-md font-medium  text-red-500 title-font ">
                        {item.bookPrice
                          ? Number(item.bookPrice).toFixed(2)
                          : "N/A"}
                      </h2>
                    </span>
                  </div>
                  <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                    Author :{" "}
                    <span className="text-red-500">{item.bookAuthor}</span>
                  </h2>
                  <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                    Pages :{" "}
                    <span className="text-red-500">{item.bookPages}</span>
                  </h2>
                  <div className="sm:flex sm:items-center sm:gap-10">
                    <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                    Size :{" "}
                      <span className="text-red-500">{item.bookSize}</span>
                    </h2>
                    <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                      Weight :{" "}
                      <span className="text-red-500">{item.bookWeight}</span>
                    </h2>
                    <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                      Language :{" "}
                      <span className="text-red-500">{item.bookLanguage}</span>
                    </h2>
                    <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                      Stock Status :{" "}
                      <span className="text-red-500">{item.outOfStock}</span>
                    </h2>
                  </div>
                  <div className="flex gap-5 items-center">
                    <button
                      onClick={() => updateModal(item._id)}
                      className="hidden sm:block  bg-blue-600 mt-4 text-white rounded h-9 w-36 hover:bg-blue-900"
                    >
                      Update
                    </button>
                    {delSpin ? (
                      <button className="hidden sm:block  bg-red-600 mt-4 text-white rounded h-9 w-36 hover:bg-red-900">
                        Deleting...
                      </button>
                    ) : (
                      <button
                        onClick={() => deleteBook(item._id)}
                        className="hidden sm:block  bg-red-600 mt-4 text-white rounded h-9 w-36 hover:bg-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* update modal  */}

      {bookId ? (
        <div className=" update-modal"   onClick={() => setBookId("")}>
          <div className="update-sub-card relative" onClick={(e)=> e.stopPropagation()}>
            <span
              onClick={() => setBookId("")}
              className="absolute right-4 cursor-pointer"
            >
              <FaWindowClose size={20} />
            </span>
            <h5 className="font-medium text-lg flex items-center gap-2">
              <FaEdit />
              Update Book Details
            </h5>
            <div className="mb-4  border-b-2  border-orange-500 mt-2 "></div>
            <div className="mt-2.5">
              <label
                htmlFor="bookName"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Item Name
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <input
                  type="text"
                  name="bookName"
                  id="bookName"
                  value={data.bookName}
                  onChange={formHandle}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                
                  onClick={() => updateBook({ bookName: data.bookName })}
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="mt-2.5">
              <label
                htmlFor="bookAuthor"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Author
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <input
                  type="text"
                  name="bookAuthor"
                  id="bookAuthor"
                  onChange={formHandle}
                  value={data.bookAuthor}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => updateBook({ bookAuthor: data.bookAuthor })}
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="mt-2.5">
              <label
                htmlFor="outOfStock"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Out Of Stock
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <select
                  name="outOfStock"
                  id="outOfStock"
                  onChange={formHandle}
                  value={data.outOfStock}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="stock">Stock</option>
                  <option value="outofstock">Out Of Stock</option>
                </select>
                <button
                  onClick={() => updateBook({ outOfStock: data.outOfStock })}
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="mt-2.5">
              <label
                htmlFor="book-price"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Item Price
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <input
                  type="text"
                  id="book-price"
                  name="bookPrice"
                  onChange={formHandle}
                  value={data.bookPrice}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => updateBook({ bookPrice: data.bookPrice })}
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="mt-2.5">
              <label
                htmlFor="book-pages"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                 Item Pages
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <input
                  type="text"
                  name="bookPages"
                  id="book-pages"
                  onChange={formHandle}
                  value={data.bookPages}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => updateBook({ bookPages: data.bookPages })}
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="mt-2.5">
              <label
                htmlFor="book-summary"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Summary
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <textarea
                  type="text"
                  id="book-summary"
                  name="bookSummary"
                  onChange={formHandle}
                  value={data.bookSummary}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => updateBook({ bookSummary: data.bookSummary })}
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>{" "}
            <div className="mt-2.5">
              <label
                htmlFor="book-language"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Language
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <input
                  type="text"
                  id="book-language"
                  name="bookLanguage"
                  autoComplete="organization"
                  onChange={formHandle}
                  value={data.bookLanguage}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() =>
                    updateBook({ bookLanguage: data.bookLanguage })
                  }
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>{" "}
            <div className="mt-2.5">
              <label
                htmlFor="book-size"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
              Size
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <input
                  type="text"
                  name="bookSize"
                  id="book-size"
                  onChange={formHandle}
                  value={data.bookSize}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => updateBook({ bookSize: data.bookSize })}
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>{" "}
            <div className="mt-2.5">
              <label
                htmlFor="book-weight"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Weight
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <input
                  type="text"
                  name="bookWeight"
                  id="book-weight"
                  onChange={formHandle}
                  value={data.bookWeight}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => updateBook({ bookWeight: data.bookWeight })}
                  className="bg-blue-600 text-white hover:bg-blue-800 w-1/3 h-10 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Products;
