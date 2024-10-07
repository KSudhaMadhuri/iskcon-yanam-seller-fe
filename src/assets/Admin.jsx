import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Admin = () => {
  const api = import.meta.env.VITE_API;

  const [sellers, setSellers] = useState([]);

  //Fetching sellers
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(`${api}/seller/getallsellers`);

        if (response) {
          console.log(response);

          setSellers(response.data.getSellers.reverse());
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSellers();
  }, []);

  const deleteSeller = async (sellerId) => {
    try {
      const response = await axios.delete(
        `${api}/seller/deleteseller/${sellerId}`
      );

      if (response) {
        const data = sellers.filter((item) => {
          return item._id !== sellerId;
        });
        setSellers(data);
        toast.success("seller deleted successfully");

      }
    } catch (error) {
      console.error(error);
      toast.error("please try again")
    }
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
    <div className="mt-20 pt-5 px-6 ">
      <h1 className="text-3xl font-bold text-gray-900">Sellers:</h1>
      <div className="overflow-x-auto mt-6 pb-10">
        {
          sellers.length?
        
        <table>
          <thead>
            <tr className="bg-blue-600 text-white h-14">
              <th className="sl">Sl.No.</th>

              <th>Seller Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller._id}>
                <td className="sl">{index + 1}</td>
                <td>{seller.fullName}</td>
                <td>{seller.email}</td>
                <td>{seller.role}</td>
                <td>{seller.admin}</td>
                <td className=" ">
                  <button className=" mb-2 bg-blue-500 text-white w-20 h-8 rounded hover:bg-blue-900">
                    Update
                  </button>
                  <button
                    onClick={() => deleteSeller(seller._id)}
                    className="bg-red-500 text-white w-20 h-8 rounded hover:bg-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>: <div className="text-xl  text-center font-medium">Loading...</div>
        }
      </div>
    </div>
    </>
  );
};

export default Admin;
