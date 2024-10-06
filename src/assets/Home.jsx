import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App"

const Home = () => {
  const api = import.meta.env.VITE_API;
  const { token } = useContext(userContext)
  const [image, setImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bookImage, setBookImage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate()

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
  });


  const formHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const fileHandling = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    setImageLoaded(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "hi1ox6r7");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      if (response) {
        setData((prevData) => ({ ...prevData, bookImage: response.data.secure_url }));
        setBookImage(response.data.secure_url);
        setImageLoaded(false);
      }
    } catch (error) {
      console.log(error);
      setImageLoaded(false);
    }
  };

  const formFunc = async (e) => {
    setSpinner(true);
    e.preventDefault();
    if (!bookImage) {
      toast.error("please upload book image");
      setSpinner(false);

    } else if (bookImage) {

      try {
        const response = await axios.post(`${api}/book/createbooks`, data);
        if (response) {
          setSpinner(false);
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
          });
          setBookImage("");
          toast.success("Product uploaded successfully");
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }

  }, [token])

  return (
    <>
      <ToastContainer
        position="top-center"
        toastClassName="bg-black text-white"
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
      />
      <div className="mt-25 pt-24 border-b-2 mx-4 border-orange-600 p-6 pb-3">
        <h3 className="text-2xl font-semibold mt-25 ">Upload Books</h3>
      </div>

      <form
        className=" p-6 sm:flex  sm:justify-around sm:gap-10 sm:items-start"
        onSubmit={formFunc}
      >
        <div className="border-b border-gray-900/10 pb-12">
          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full ">
              <label
                htmlFor="book-photo"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Book Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {bookImage ? (
                    <img
                      src={bookImage}
                      alt="cloudinary Image URL"
                      className="mx-auto h-96 w-25 "
                    />
                  ) : (
                    <svg
                      className="mx-auto h-50 w-50 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    {imageLoaded ? (
                      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <div className="bg-blue-600 text-white w-28 h-10 flex items-center justify-center rounded">
                          Uploading...
                        </div>
                      </label>
                    ) : (
                      <label
                        htmlFor="book-image"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <div className="bg-blue-600 text-white w-28 h-10 flex items-center justify-center rounded">
                          Upload Photo
                        </div>

                        <input
                          id="book-image"
                          type="file"
                          className="sr-only"
                          onChange={fileHandling}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-12  ">
          <div className="">
            <h2 className=" font-semibold text-xl leading-7 text-gray-900">
              Product details
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-8">
              <div className="sm:col-span-3">
                <label
                  htmlFor="book-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Book Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="bookName"
                    id="book-name"
                    required
                    onChange={formHandle}
                    value={data.bookName}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="book-author"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Book Author
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="bookAuthor"
                    id="book-author"
                    required
                    onChange={formHandle}
                    value={data.bookAuthor}
                    className=" pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="book-price"
                  className=" block text-sm font-medium leading-6 text-gray-900"
                >
                  Book Price
                </label>
                <div className="mt-2">
                  <input
                    id="book-price"
                    name="bookPrice"
                    type="text"
                    required
                    onChange={formHandle}
                    value={data.bookPrice}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            
              <div className="col-span-3">
                <label
                  htmlFor="book-pages"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Book Pages
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="bookPages"
                    id="book-pages"
                    required
                    onChange={formHandle}
                    value={data.bookPages}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-2">
                  <div className="col-span-full">
                    <label
                      htmlFor="book-summary"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Book Summary
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="book-summary"
                        name="bookSummary"
                        onChange={formHandle}
                        value={data.bookSummary}
                        rows={1}
                        className=" pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3 sm:col-start-1">
                <label
                  htmlFor="book-language"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Book Language
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="bookLanguage"
                    id="book-language"
                    required
                    onChange={formHandle}
                    value={data.bookLanguage}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="book-size"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Book Size
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="bookSize"
                    id="book-size"
                    onChange={formHandle}
                    value={data.bookSize}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="book-weight"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Book Weight
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="bookWeight"
                    id="book-weight"
                    onChange={formHandle}
                    value={data.bookWeight}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {spinner ? (
              <button
                type="button"
                className=" bg-gradient-to-r   justify-center  from-indigo-600 to-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600   rounded-md flex items-center"
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
                Product Uploading...
              </button>
            ) : (
              <button
                type="submit"
                className=" bg-gradient-to-r   justify-center  from-indigo-600 to-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600   rounded-md flex items-center"
              >
                Upload Product
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Home;
