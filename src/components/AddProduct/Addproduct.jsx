import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";

export default function Addproduct(props) {
  const {getSellerProducts, setAddProductFormDisplay} = props

  const [subcategories, setSubcategories] = useState([]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectedCategory = watch("category");
  const categories = {
    "Computer & Laptops": [
      "Laptops",
      "Desktop Computers",
      "Computer Accessories",
    ],
    "Mobile & Accessories": ["Smartphones", "Mobile Accessories"],
    "Audio & Headphones": ["Headphones", "Speaker", "Audio Accessories"],
    "Camera & Photography": ["Digital Cameras", "Camera Accessories"],
    "Home Appliances": ["Smart Home Devices", "Kitchen Appliances"],
    "Tv and Home Entertainment": ["Television", "Home Theatre Systems"],
    "Wearables & Smart Devices": [
      "Smartwatches",
      "Fitness Tracker",
      "Smart Home Devices",
    ],
    Gaming: ["Gaming Consoles", "Video Games", "Gaming Accessories"],
  };
  const onSubmit = async (data) => {
    data.productImages = [data.productImageUrl1, data.productImageUrl2];
    try {
      const addProduct = await fetch(
        "/api/v1/seller/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await addProduct.json();


      setAddProductFormDisplay('hidden')
      getSellerProducts()

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setSubcategories(categories[selectedCategory]);
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col border-2 max-w-[800px] mx-auto p-4 rounded-md bg-white shadow-2xl shadow-black">
      <div
        className="font-bold text-2xl cursor-pointer text-right pr-4"
        onClick={()=>{setAddProductFormDisplay('hidden')}}
      >
        <i className="fa-solid fa-x"></i>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col my-6">
          <label htmlFor="title" className="font-semibold">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Product Title..."
            className="border border-slate-400 focus:outline-slate-600 p-1 px-4 rounded-lg mt-2"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">*This field is required</span>
          )}
        </div>
        <div className="flex flex-col my-6 relative">
          <label htmlFor="price" className="font-semibold">
            Price
          </label>
          <div className="absolute top-9 left-3 border-r pr-2 opacity-80 border-slate-600">
            <i className="fa-solid fa-indian-rupee-sign"></i>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            min={0}
            placeholder="Enter Product Price..."
            className="border border-slate-400 focus:outline-slate-600 p-1 pl-10 rounded-lg mt-2 remove-arrow"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-500">*This field is required</span>
          )}
        </div>
        <div className="flex flex-col my-6">
          <label htmlFor="description" className="font-semibold">
            Product Descrition
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Enter Product Description..."
            minLength={15}
            className="border border-slate-400 focus:outline-slate-600 p-1 h-20 px-4 rounded-lg mt-2 resize-none "
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500">*This field is required</span>
          )}
        </div>
        <div className="flex flex-col my-6">
          <label htmlFor="" className="font-semibold">
            Product Images Urls
          </label>
          <input
            type="text"
            name="productImageUrl1"
            id="productImageUrl1"
            placeholder="Enter Product's First Image Url..."
            className="border border-slate-400 focus:outline-slate-600 p-1 px-4 rounded-lg mt-2"
            {...register("productImageUrl1", {
              validate: (v) => {
                return validator.isURL(v);
              },
            })}
          />
          {errors.productImageUrl1 && (
            <span className="text-red-500">*Please enter a valid url</span>
          )}
          <input
            type="text"
            name="productImageUrl2"
            id="productImageUrl2"
            placeholder="Enter Product's Second Image Url..."
            className="border border-slate-400 focus:outline-slate-600 p-1 px-4 rounded-lg mt-2"
            {...register("productImageUrl2", {
              validate: (v) => {
                return validator.isURL(v);
              },
            })}
          />
          {errors.productImageUrl2 && (
            <span className="text-red-500">*Please enter a valid url</span>
          )}
        </div>
        <div className="flex sm:items-center  flex-col sm:flex-row my-6">
          <div className="flex flex-col sm:items-center sm:flex-row pr-10">
            <label htmlFor="category" className="font-semibold sm:mr-4">
              Product Category
            </label>
            <div>
              <select
                name="category"
                id="category"
                className="border border-slate-400 p-1 rounded-lg cursor-pointer focus:outline-slate-600"
                {...register("category", { required: true })}
              >
                <option value="">Select</option>
                {Object.keys(categories).map((category) => {
                  return (
                    <option key={category} className="" value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
              {errors.category && (
                <p className="text-red-500">Please select a category</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:items-center sm:flex-row pr-10">
            <label htmlFor="subcategory" className="font-semibold sm:mr-4">
              Product Subcategory
            </label>
            <div>
              <select
                name="subcategory"
                id="subcategory"
                className="border border-slate-400 p-1 rounded-lg px-2 cursor-pointer focus:outline-slate-600"
                {...register("subcategory", { required: true })}
              >
                <option value="">Select</option>
                {subcategories &&
                  subcategories.map((subcategory) => {
                    return (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    );
                  })}
              </select>
              {errors.subcategory && (
                <p className="text-red-500">*Please select a subcategory</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <input className="cursor-pointer ml-4 text-white font-bold text-lg bg-red-600 rounded-md p-2"
          type="reset"
          value="Close"
          onClick={()=>{setAddProductFormDisplay('hidden')}} />
          <input
            type="reset"
            value="Reset"
            className="cursor-pointer ml-4 text-white font-bold text-lg bg-sky-600 rounded-md p-2 "
          />
          <input
            type="submit"
            value="Add Product"
            className="cursor-pointer ml-4 text-white font-bold text-lg bg-sky-600 rounded-md p-2 "
          />
        </div>
      </form>
    </div>
  );
}
