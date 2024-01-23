import React, { useEffect } from "react";
import { Dashboard, SellerStories } from "../../components";
import { useSelector } from "react-redux";
import headerImage from "../../assets/header.png";
import { NavLink } from "react-router-dom";

export default function Home() {
  const isSellerLoggedIn = useSelector((state) => state.auth.isSellerLoggedIn);

  return (
    <div>
      <div className={`${isSellerLoggedIn ? "" : "hidden"}`}>
        <div className="">
          <Dashboard />
        </div>
      </div>
      <div className={`${isSellerLoggedIn?'hidden':''}`}>
        <div className="bg-gradient-to-r from-sky-100 to-sky-300 ">
          <div className="flex items-center justify-center md:justify-between max-w-[1200px] mx-auto px-10 py-5">
            <div className="text-center md:text-left">
              <h1 className="font-semibold text-4xl mb-3 text-orange-600 whitespace-nowrap">
                Become a BucketBuy
              </h1>
              <h1 className="font-semibold text-4xl mb-3 text-blue-700">
                Online Seller
              </h1>
              <p className="max-w-[500px] ">
                <span className="whitespace-wrap">
                  Welcome to BucketBuySeller – the ultimate destination for
                  electronic entrepreneurs! Elevate your brand by listing your
                  cutting-edge products on our platform.{" "}
                </span>
                <span className="sm:hidden md:flex">
                  Join a thriving community, showcase your innovations, and
                  maximize your sales potential.
                </span>{" "}
              </p>

              <button className="bg-orange-600 rounded-lg hover:bg-orange-700 px-5 py-2 mt-5 text-white">
                <span className="text-xl mr-2">
                  <NavLink to={"/signup"}>Start Selling</NavLink>
                </span>{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div>
              <img src={headerImage} alt="" className="hidden md:inline-flex" />
            </div>
          </div>
        </div>

        <div className="">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-3xl py-8 font-semibold ">
              Reviews By Some Sellers
            </h1>
            <SellerStories />
          </div>
        </div>
      </div>
    </div>
  );
}
