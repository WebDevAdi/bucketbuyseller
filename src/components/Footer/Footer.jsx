import React from "react";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="bg-sky-900 mt-10">
     
        <div className="flex flex-col sm:flex-row justify-around items-center py-10 text-white max-w-[1200px] mx-auto">
          
          <div className="pb-6 md:pb-0">
            <Logo/>
          </div>

          <div className="text-center mb-10 sm:mb-0">
            © 2024 BucketBuy Electronic Store. Powered by BucketBuy
          </div>
          <div className="flex justify-around text-white text-2xl">
            <i className="px-5 fa-brands fa-facebook"></i>
            <i className="px-5 fa-brands fa-instagram"></i>
            <i className="px-5 fa-brands fa-youtube"></i>
            <i className="px-5 fa-brands fa-twitter"></i>
            <i className="px-5 fa-brands fa-pinterest"></i>
          </div>
        </div>
    </footer>
  );
}
