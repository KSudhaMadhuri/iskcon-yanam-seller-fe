import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../App'
import { FaRupeeSign } from 'react-icons/fa'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'


const Products = () => {
  const api = import.meta.env.VITE_API;
  const { products, token, setProducts } = useContext(userContext)
  const [delSpin, setDeSpin] = useState(false)

  // delete books function 
  const deleteBook = async (itemId) => {
    setDeSpin(true)
    try {
      const response = await axios.delete(`${api}/book/delbooks/${itemId}`)
      if (response) {
        setDeSpin(false)
        toast.success("Product deleted successfully")
        const remaining = products.filter((item) => item._id !== itemId)
        setProducts(remaining)
      }
    } catch (error) {
      console.log(error);
      setDeSpin(false)
      toast.error("Please try again")
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token])

  return (
    <>
      <ToastContainer position="top-center"
        toastClassName="bg-black text-white"
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true} />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <h5 className='font-bold text-lg mb-4 text-end'>Total Products : {products.length}</h5>
          <div className="-my-8 divide-y-2 divide-gray-100">
            {products.map((item) => (
              <div key={item._id} className="py-8 flex sm:gap-12 flex-wra gap-4 md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col ">
                  <img src={item.bookImage} alt={item.bookName} className='w-36  sm:w-72 sm:h-72 ' />
                  <button className='block sm:hidden  bg-blue-600 mt-4 text-white rounded h-9 hover:bg-blue-900'>Update</button>

                  {delSpin ?
                    <button className=' block sm:hidden bg-red-600 mt-4 text-white rounded h-9 w-36 hover:bg-red-900'>Deleting...</button>
                    :
                    <button onClick={() => deleteBook(item._id)} className=' block sm:hidden bg-red-600 mt-4 text-white rounded h-9 w-36 hover:bg-red-900'>Delete</button>

                  }

                </div>
                <div className="md:flex-grow">
                  <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                    Book Name : <span className='text-red-500'>
                      {item.bookName}
                    </span>
                  </h2>
                  <h5 className="font-medium overflow-auto h-14 sm:h-34 sm:mb-2">

                    Book Summary : <span className='text-red-500 font-medium '>
                      {item.bookSummary}
                    </span>
                  </h5>
                  <div className=" flex gap-2 items-center font-medium mb-2">
                    Book Price :
                    <span className='flex items-center'>

                      <FaRupeeSign size={13} color='red' />
                      <h2 className="text-md font-medium  text-red-500 title-font ">
                        {item.bookPrice}
                      </h2>
                    </span>
                  </div>
                  <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                    Book Author : <span className='text-red-500'>

                      {item.bookAuthor}
                    </span>
                  </h2>
                  <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                    Pages : <span className='text-red-500'>
                      {item.bookPages}
                    </span>

                  </h2>
                  <div className='sm:flex sm:items-center sm:gap-10'>
                    <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                      Book Size : <span className='text-red-500'>

                        {item.bookSize}
                      </span>
                    </h2>
                    <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                      Weight : <span className='text-red-500'>

                        {item.bookWeight}
                      </span>
                    </h2>
                    <h2 className="text-md font-medium text-gray-900 title-font mb-2">
                      Language : <span className='text-red-500'>

                        {item.bookLanguage}
                      </span>
                    </h2>
                  </div>
                  <div className='flex gap-5 items-center'>
                    <button className='hidden sm:block  bg-blue-600 mt-4 text-white rounded h-9 w-36 hover:bg-blue-900'>Update</button>
                    {delSpin ?
                      <button className='hidden sm:block  bg-red-600 mt-4 text-white rounded h-9 w-36 hover:bg-red-900'>Deleting...</button>
                      :
                      <button onClick={() => deleteBook(item._id)} className='hidden sm:block  bg-red-600 mt-4 text-white rounded h-9 w-36 hover:bg-red-900'>Delete</button>

                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>

  )
}

export default Products