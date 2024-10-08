import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import {CgProfile} from "react-icons/cg"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { user, token, setToken } = useContext(userContext);
  const navigate = useNavigate()

  // Handle clicks outside of dropdown or mobile menu
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if dropdownRef and mobileMenuRef are not null and if the click was outside both
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        c;
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, mobileMenuRef, dropdownOpen, mobileMenuOpen]);


  useEffect(() => {
    if (!token) {
      navigate("/login")
    }

  }, [])


  const logOut = () => {
    localStorage.removeItem("token")
    setToken("")
  }
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-orange-500 w-full fixed top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-7 lg:px-7">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}

            {mobileMenuOpen ? (
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex  items-center">
              <img
                src="/iskcon_logo.jpg"
                alt="logo"
                className="w-10 h-10 rounded mr-3"
              />
              <h3 className="text-white font-semibold text-xl">ISKCONyanam</h3>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {token && <>

                  {user && user.role === "admin" && (
                    <>
                      <Link
                        to="/"
                        className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                        aria-current="page"
                      >
                        Home
                      </Link>
                      <Link
                        to="/products"
                        className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                      >
                        Products
                      </Link>

                      <Link
                        to="/orders"
                        className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                      >
                        Orders
                      </Link>
                    </>
                  )}
                  {user && user.admin === "admin" && (
                    <Link
                      to="/admin"
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                    >
                      Admin
                    </Link>
                  )}
                </>}

              </div>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {token ?<><button
                    
                    className="flex items-center justify-between gap-2 text-nowrap rounded-md px-3 py-2 text-sm font-medium text-white  "
                  >
                    <CgProfile/>  {user.fullName}
                  </button>


                  <button
                    onClick={logOut}
                    className="bg-indigo-800 text-nowrap rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-white"
                  >
                    Log out
                  </button></>
                  : <>


                    <Link
                      to="/login"
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white text-nowrap"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className=" text-nowrap rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                    >
                      Sign up
                    </Link>
                  </>
                }


              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu" ref={mobileMenuRef}>


          <div className="space-y-1 px-2 pb-3 pt-2">
            {token && (
              <>
                {user && user.role === "admin" && (
                  <>
                    <Link
                      to="/"
                      className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                      aria-current="page"
                    >
                      Home
                    </Link>
                    <Link
                      to="/orders"
                      className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/products"
                      className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                    >
                      Products
                    </Link>
                  </>
                )}

                {user && user.admin === "admin" && (
                  <Link
                    to="/admin"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}

            {token ?<>
              <button
                
                className=" flex items-center justify-between gap-2  rounded-md px-3 py-2 text-base font-medium text-white "
              >
                <CgProfile/> {user.fullName}
              </button>
            
              <button
                onClick={logOut}
                className=" block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white "
              >
                Log out
              </button></> : <>
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white "
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                >
                  Sign up
                </Link>

              </>
            }


          </div>
        </div>
      )}
    </nav>
  );
}
