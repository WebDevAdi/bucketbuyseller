import React,{useEffect} from "react";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSeller, clearSeller } from "./features/authSlice";

function Layout() {

  const dispatch = useDispatch()
  
  const getCurrentUser = async () => {
    try {
      const response = await fetch("/api/v1/seller/getCurrentSeller");
      const seller = await response.json();
      if (seller) {
        dispatch(setSeller(seller.data));
      } else {
        dispatch(clearSeller);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  });
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      </>
  );
}

export default Layout;
