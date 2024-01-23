import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useSelector, useDispatch } from "react-redux";
import { clearSeller } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const isSellerLoggedIn = useSelector((state) => state.auth.isSellerLoggedIn);
  const currentSeller = useSelector((state) => state.auth.seller);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleNav = () => {
    document.getElementById("navigationMenu").classList.toggle("hidden");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/seller/sellerLogout", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      if (response) {
        dispatch(clearSeller());
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const showProfile = () => {
    document.getElementById("profileContainer").classList.toggle("hidden");
  };

  return (
    <div>
      <div className="bg-sky-500 p-5">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto ">
          
          
          <div className="flex">
            {/* hamberger icon */}
          <div className={`${isSellerLoggedIn ? "" : ""}`}>
            <div className="sm:hidden mx-2 cursor-pointer text-white text-3xl">
              <i className="fa-solid fa-bars" onClick={toggleNav}></i>
            </div>
          </div>
          {/* Logo */}
            <NavLink to={"/"}>
              <Logo />
            </NavLink>
          </div>
          <div className={`${isSellerLoggedIn ? "hidden" : "flex"}`}>
            <button className="hover:bg-orange-500 whitespace-nowrap bg-orange-600 px-5 py-2 mx-2 rounded-md text-white font-semibold">
              <NavLink to={"/login"}>Log In</NavLink>
            </button>
            <button className="hover:bg-orange-500 hidden sm:flex whitespace-nowrap bg-orange-600 px-5 py-2 mx-2 rounded-md text-white font-semibold">
              <NavLink to={"/signup"}>Sign Up</NavLink>
            </button>
          </div>

          <div className={`${isSellerLoggedIn ? "flex" : "hidden"}`}>
            <div className={`flex items-center relative`}>
              {/* div for user proile */}
              <div
                className="h-10 w-10 rounded-full mx-3"
                style={{
                  backgroundImage: `url(${currentSeller?.profilePhoto})`,
                  backgroundSize: "cover",
                }}
                onClick={showProfile}
              ></div>
              <div
                className="hidden sm:flex hover:cursor-pointer"
                onClick={showProfile}
              >
                <div className="text-white font-semibold text-2xl">
                  {currentSeller?.fullname}
                </div>
                <div className="text-white mx-1 text-2xl">
                  <i className="fa-solid fa-caret-down"></i>
                </div>
              </div>

              {/*seller Profile Info */}
              <div
                id="profileContainer"
                className="hidden absolute top-10 right-2 flex-col border shadow-md bg-white text-black rounded-sm z-10"
              >
                <div
                  className="text-right px-4 py-3 cursor-pointer"
                  onClick={showProfile}
                >
                  <i className="fa-solid fa-x"></i>
                </div>
                <div className="flex flex-col items-center px-10">
                  <div
                    className="h-20 w-20 rounded-full mx-3 border border-slate-400 mb-3"
                    style={{
                      backgroundImage: `url(${currentSeller?.profilePhoto})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="font-bold">{currentSeller?.fullname}</div>
                  <div>{currentSeller?.email}</div>
                </div>
                <div className="flex flex-col pt-3">
                  <button className="hover:text-white hover:bg-sky-500 py-2 w-full text-left">
                    <i className="fa-solid fa-gear px-3"></i>{" "}
                    <span className="font-semibold">Account Setting</span>{" "}
                  </button>
                  <button
                    className="hover:text-white hover:bg-sky-500 py-2 w-full text-left"
                    onClick={handleLogout}
                  >
                    <i className="fa-solid fa-right-from-bracket px-3"></i>{" "}
                    <span className="font-semibold">Log Out</span>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* navigation menu */}
      <div className={`${isSellerLoggedIn ? "" : "hidden"} bg-sky-600`}>
        <div
          id="navigationMenu"
          className={`hidden sm:flex max-w-[1200px] mx-auto  font-semibold text-lg text-white justify-around `}
        >
          <NavLink to={"/"}>
            <div
              className="p-2 cursor-pointer hover:bg-sky-500 sm:hover:none"
              onClick={toggleNav}
            >
              Dashboard
            </div>
          </NavLink>
          <NavLink to={"/"}>
            <div
              className="p-2 cursor-pointer hover:bg-sky-500 sm:hover:none"
              onClick={toggleNav}
            >
              Dashboard
            </div>
          </NavLink>
          <NavLink to={"/"}>
            <div
              className="p-2 cursor-pointer hover:bg-sky-500 sm:hover:none"
              onClick={toggleNav}
            >
              Dashboard
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
