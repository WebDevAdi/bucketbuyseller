import React, { useEffect } from "react";
import SellerReview from "./SellerReview";
import { nanoid } from "@reduxjs/toolkit";

const SellerStories = () => {


  const sellerReviews = [
    {
      sellerName: "Rajesh",
      profilePic:"https://img.freepik.com/free-photo/medium-shot-man-posing-indoors_23-2149438602.jpg?w=740&t=st=1705247439~exp=1705248039~hmac=1db91eb449585b461788a0bdf943f1ada95ccee7b871a81a475022bc81e136f1",
      reviewText:
        "BucketBuySeller has been a game-changer for my electronics business. The platform's reach, coupled with seamless transactions, has significantly boosted my sales. It's the perfect stage for sellers aiming for growth and success.",
    },
    {
      sellerName: "Priya",
      profilePic:"https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?w=740&t=st=1705247598~exp=1705248198~hmac=e9be5613bc8672bf0d9d8c8a8d25acc896447709e8ef0497aa512c81e3e74220",
      reviewText:
        "As a tech enthusiast, I found a perfect platform in BucketBuySeller to sell my electronic creations. The support and recognition I've received have been overwhelming. It's not just a marketplace; it's a community that appreciates innovation.",
    },
    {
      sellerName: "Vikram",
      profilePic:"https://img.freepik.com/free-photo/medium-shot-guy-with-raised-eyebrow_23-2148227962.jpg?w=740&t=st=1705247573~exp=1705248173~hmac=8c550af860f9d41e4082cf83e04ac520a263102520cf1052d55e87c9c7f35d66",
      reviewText:
        "Starting my electronics startup on BucketBuySeller was the best decision. The quick growth and exposure to a diverse customer base have been phenomenal. The platform's interface and seller support make it a standout choice for any budding entrepreneur.",
    },
    {
      sellerName: "Neha",
      profilePic:"https://img.freepik.com/free-photo/portrait-smiling-young-woman_1268-21864.jpg?w=740&t=st=1705247629~exp=1705248229~hmac=11ca55f6c24848740ab3e7140fb44e1a0f3b2591dfba58eb36295158ce5a63df",
      reviewText:
        "BucketBuySeller has become my go-to destination for quality electronic products. The variety and reliability of sellers on the platform make it a trusted marketplace. Shopping here has been a delightful experience.",
    },
    {
      sellerName: "Sandeep",
      profilePic:"https://img.freepik.com/free-photo/guy-plaid-shirt_158595-125.jpg?w=740&t=st=1705247497~exp=1705248097~hmac=46cc6e3a605d39145355bb1e1b6020d6872e3ce97088db6e48a546971513682e",
      reviewText:
        "I've been a seller on BucketBuySeller for years, and the platform's consistent efforts to enhance the seller experience are commendable. The seller hub simplifies management, and the extensive customer base ensures steady sales. Highly recommended!",
    },
  ];

  let index = 0;

  const displayReview = () => {
    const allReviews = Array.from(document.querySelectorAll(".review"));
    const allBullets = Array.from(document.querySelectorAll(".bullets"));

    allReviews.forEach((review) => {
      if (review == allReviews[index]) {
        review.classList.remove("hidden");
      } else {
        review.classList.add("hidden");
      }
    });

    allBullets.forEach((bullet) => {
      if (bullet == allBullets[index]) {
        bullet.classList.replace("bg-slate-500",'bg-black');
    } else {
          bullet.classList.replace('bg-black',"bg-slate-500");
      }
    });
  };

  const handleNextClick = () => {
    index += 1;
    if (index == sellerReviews.length) index = 0;
    displayReview();
  };

  const handlePreviousClick = () => {
    index -= 1;
    if (index < 0) index = sellerReviews.length - 1;
    displayReview();
  };

    

  useEffect(() => {
    displayReview();

    
  }, []);
  return (
    <div className="">
      <div className="flex items-center relative bg-sky-50 shadow-md py-2">
        <div className=" flex flex-col customScrollBar overflow-auto">
          {sellerReviews.map((review, index) => {
            return (
              <div className="flex flex-col" key={index}>
                <div className="review hidden" >
                  <SellerReview
                    name={review.sellerName}
                    profilePic={review.profilePic}
                    reviewPara={review.reviewText}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex justify-center">
            {sellerReviews.map((review) => {
              return (
                <div key={Math.random()} className="bullets h-2 w-2 rounded-full bg-slate-500 mx-1"></div>
              );
            })}
          </div>
        </div>
        <div className="absolute w-full flex justify-between items-center">
          <div
            className="flex justify-center items-center text-xl w-9 h-9 cursor-pointer rounded-full bg-white ml-4 shadow-xl"
            onClick={handlePreviousClick}
          >
            <i className="fa-solid fa-less-than"></i>
          </div>
          <div
            className="flex justify-center items-center text-xl w-9 h-9 cursor-pointer rounded-full bg-white mr-4 shadow-lg"
            onClick={handleNextClick}
          >
            <i className="fa-solid fa-greater-than"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerStories;
