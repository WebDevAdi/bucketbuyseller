import React from "react";

function SellerReview(props) {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-center px-8 md:px-16 py-5">
        <div className="">
          <div className={`h-[100px] w-[100px] md:h-40 md:w-40 rounded-full`} style={{backgroundImage:`url(${props.profilePic})`,backgroundSize:'cover'}}>
          </div>
        </div>

        <div className="text-center md:text-left flex flex-col justify-around px-10">
          <h1 className="text-3xl py-5 md:py-0">{props.name},</h1>
          <p className="text-slate-600 italic mt-0 md:mt-8">
            {props.reviewPara}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SellerReview;
