import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

const Admin = () => {
  const api = import.meta.env.VITE_API;
  const [delSpin, setDelSpin] = useState("");
  const [sellers, setSellers] = useState([]);
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [admin, setAdmin] = useState("seller");
  const [role, setRole] = useState("seller");
  const [roleSpin, setRoleSpin] = useState(false);
  const [adminSpin, setAdminSpin] = useState(false);
  const [update, setUpdate] = useState(false);

  //Fetching sellers
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(`${api}/seller/getallsellers`);

        if (response) {
          setSellers(response.data.getSellers.reverse());
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSellers();
  }, [update]);

  // deleting seller account
  const deleteSeller = async (sellerId) => {
    const delConfirm = confirm(
      "Seller will be deleted permanently, are you sure? "
    );
    if (delConfirm) {
      setDelSpin(sellerId);
      try {
        const response = await axios.delete(
          `${api}/seller/deleteseller/${sellerId}`
        );

        if (response) {
          const data = sellers.filter((item) => {
            return item._id !== sellerId;
          });
          setSellers(data);
          setDelSpin("");

          toast.success("seller deleted successfully");
        }
      } catch (error) {
        console.error(error);
        setDelSpin("");

        toast.error("please try again");
      }
    }
  };

  // update modal toggle function
  const updateModal = (aId) => {
    setAdminId(aId);
  };

  // update seller roLe and admin values

  const updateSellerRole = async () => {
    const updateConfirm = confirm("Updating seller role, are you sure?");
    if (updateConfirm) {
      setRoleSpin(true);
      setUpdate(true);
      try {
        const res = await axios.put(
          `${api}/seller/updatesellerrole/${adminId}`,
          { role: role }
        );
        if (res) {
          toast.success("Updated seller role successfully");
          setRoleSpin(false);
          setUpdate(false);
          setAdminId("")
        }
      } catch (error) {
        console.log(error);
        toast.error("Please try again");
        setRoleSpin(false);
      }
    }
  };
  const updateSellerAdmin = async () => {
    const updateConfirm = confirm("Updating seller role, are you sure?");
    if (updateConfirm) {
      setAdminSpin(true);
      setUpdate(true);
      try {
        const res = await axios.put(
          `${api}/seller/updatesellerrole/${adminId}`,
          { admin:admin }
        );
        if (res) {
          toast.success("Updated seller's admin value successfully");
          setAdminSpin(false);
          setUpdate(false);
          setAdminId("")
        }
      } catch (error) {
        console.log(error);
        toast.error("Please try again");
        setRoleSpin(false);
      }
    }
  };
  

  // if not token it navigates to login page
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <ToastContainer
        position="top-center"
        toastClassName="bg-black text-white"
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
      />
      <div className="mt-20 pt-5 px-6  text-center" style={{ width: "100vw" }}>
        <h1 className="text-2xl font-bold text-gray-900">Sellers Table</h1>

        <div className="overflow-x-auto mt-6 pb-10">
          {sellers.length ? (
            <table>
              <thead>
                <tr className="bg-blue-600 text-white h-14">
                  <th>Sl.No.</th>
                  <th className="text-nowrap">Seller Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Admin</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, index) => (
                  <tr key={seller._id}>
                    <td>{index + 1}</td>
                    <td className="text-nowrap">
                      {seller.fullName.substring(0, 15)}
                    </td>
                    <td>{seller.email}</td>
                    <td>
                      <div className="flex justify-center w-full">
                        <h5
                          className={
                            seller.role === "admin"
                              ? "flex items-center justify-center bg-green-600 h-8 w-[6rem] rounded font-semibold text-white"
                              : ""
                          }
                        >
                          {seller.role}
                        </h5>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center w-full">
                        <h5
                          className={
                            seller.admin === "admin"
                              ? "flex items-center justify-center bg-indigo-600 text-white  h-8 w-[6rem] rounded font-semibold"
                              : ""
                          }
                        >
                          {seller.admin}
                        </h5>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => updateModal(seller._id)}
                          className=" mb-2 bg-blue-500 text-white w-24 h-9 rounded hover:bg-blue-900"
                        >
                          Update
                        </button>

                        {delSpin === seller._id ? (
                          <button className="bg-red-500 text-white w-24 h-9 rounded hover:bg-red-900">
                            Deleting...
                          </button>
                        ) : (
                          <button
                            onClick={() => deleteSeller(seller._id)}
                            className="bg-red-500 text-white w-24 h-9 rounded hover:bg-red-900"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-xl mt-10 pt-10 text-center font-medium">
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* seller update modal  */}
      {adminId ? (
        <div className="seller-modal-card px-5">
          <div className="seller-sub-card bg-white rounded  p-3  w-[20rem]">
            <div className="mb-6 flex justify-between items-center">
              <h5 className="text-xl font-semibold">Update seller details</h5>
              <span onClick={() => setAdminId("")} className="cursor-pointer">
                <FaWindowClose size={20} />
              </span>
            </div>
            <div className="flex items-center  justify-between mt-3">
              <h5 className="font-semibold">Role : </h5>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-black rounded"
              >
                <option value="seller">seller</option>
                <option value="admin">admin</option>
              </select>
              {roleSpin ? (
                <button className=" mb-2 bg-blue-500 text-white w-24 h-9 rounded hover:bg-blue-900">
                  Updating...
                </button>
              ) : (
                <button
                  onClick={updateSellerRole}
                  className=" mb-2 bg-blue-500 text-white w-24 h-9 rounded hover:bg-blue-900"
                >
                  Update
                </button>
              )}
            </div>
            <div className="flex items-center  justify-between mt-4">
              <h5 className="font-semibold">Admin : </h5>
              <select
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
                className="border border-black rounded"
              >
                <option className="cursor-pointer" value="seller">
                  seller
                </option>
                <option className="cursor-pointer" value="admin">
                  admin
                </option>
              </select>
              {
                adminSpin?
                <button  className=" mb-2 bg-blue-500 text-white w-24 h-9 rounded hover:bg-blue-900">
                Updating...
              </button>:
              
              <button onClick={updateSellerAdmin} className=" mb-2 bg-blue-500 text-white w-24 h-9 rounded hover:bg-blue-900">
                Update
              </button>
              }
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Admin;
