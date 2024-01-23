import React, { useEffect, useId, useState } from "react";
import Addproduct from "../AddProduct/Addproduct";
import axios from 'axios'

export default function Dashboard() {
  // const [productSelected,setProductSelected] = useState(false)

  const [products, setProducts] = useState([]);
  const [addProductFormDisplay,setAddProductFormDisplay] = useState('hidden')
  const [confirmDeleteBoxDisplay,setConfirmDeleteBoxDisplay] = useState('hidden')
  const [productIds,setProductIds] = useState([])
  const [checkedProducts, setCheckedProducts] = useState({});
  // const options = {
  //   method: "GET",
  //   headers:{
  //     Accept:'*/*',
  //     'Content-Type':'application/json'
  //   },
  //   credentials:'include'
  // };

  const getSellerProducts = async () => {
    try {
      const response = await fetch(
        "/api/v1/seller/getSellerProducts",
      );

      const products = await response.json();

      setProducts(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectAll = (e) => {
    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });

    // Update the checkedProducts state
    setCheckedProducts((prevChecked) =>
      Object.fromEntries(
        products.map((product) => [product._id, e.target.checked])
      )
    );
  };

  const handleCheckboxChange = (productId) => {
    // Update the checkedProducts state for the specific product
    setCheckedProducts((prevChecked) => ({
      ...prevChecked,
      [productId]: !prevChecked[productId],
    }));
  };

  const handleCopyText = async (e) => {
    navigator.clipboard.writeText(e.target.parentElement.innerText);

    e.target.classList.remove("fa-regular", "fa-copy");
    e.target.classList.add("fa-solid", "fa-check");

    e.target.previousElementSibling.classList.toggle("hidden");
    setTimeout(() => {
      e.target.previousElementSibling.classList.toggle("hidden");
      e.target.classList.remove("fa-solid", "fa-check");
      e.target.classList.add("fa-regular", "fa-copy");
    }, 400);
  };


  const deleteProductBtn = () =>{
    const checkboxes = document.querySelectorAll('.checkbox')

    
    if(checkboxes.length === 0){
      return null
    }

    
    const productIdsToDelete = []

    checkboxes.forEach((checkbox)=>{
      if(checkbox.checked){
        productIdsToDelete.push(checkbox.parentElement.nextElementSibling.innerText)
      }
    })

    if(productIdsToDelete.length === 0){
      alert('Please select atleast 1 product')
      return null
    }

    setProductIds(productIdsToDelete)

    setConfirmDeleteBoxDisplay('')

  }

  const deleteProductsFromDatabase = async () => {
    try {
      const deleteProducts = await fetch('/api/v1/seller/deleteSelectedProduct',{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({productIds:productIds})
      })
      
      
    setConfirmDeleteBoxDisplay('hidden')
      getSellerProducts()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSellerProducts();
  }, []);
  return (
    <div className="flex-col max-w-[1200px] mx-auto p-5 relative ">
      <div className=" relative ">
        <div className="mt-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
        <div className="mt-5">
          <h2 className="text-3xl">My Products ({products.length})</h2>
        </div>
        <div className="tableContainer mt-5 h-96 overflow-auto shadow-lg shadow-gray-300 rounded-md">
          <table className="table-auto w-full">
            <thead className=" bg-sky-700 text-white whitespace-nowrap w-full">
              <tr>
                <th className="p-2 ">
                  <input
                    type="checkbox"
                    name=""
                    id="selectAll"
                    className="cursor-pointer"
                    onChange={selectAll}
                  />
                  Select
                </th>
                <th className="p-2 ">Product Id</th>
                <th className="p-2 ">Title</th>
                <th className="p-2 ">Price</th>
                <th className="p-2 ">Description</th>
                <th className="p-2 ">Images</th>
                <th className="p-2 ">Category</th>
                <th className="p-2 ">Subcategory</th>
                <th className="p-2 ">Total Sales</th>
                <th className="p-2 ">Published Date</th>
              </tr>
            </thead>
            <tbody className="">
              {products &&
                products.map((product) => {
                  let randomInteger = Math.random();
                  return (
                    <tr key={randomInteger} className="">
                      <td className="text-center border border-slate-300 ">
                        <input
                        id={product._id}
                          type="checkbox"
                          name="selectedProduct"
                          className="checkbox cursor-pointer "
                          checked={checkedProducts[product._id] || false}
                          onChange={() => handleCheckboxChange(product._id)}
                        />
                      </td>

                      {Object.keys(product).map((keyValue) => {
                        let randomKeys = Math.random();

                        return (
                          <td
                            key={randomKeys}
                            title={product[keyValue]}
                            className="group p-2 text-center whitespace-nowrap max-w-40 overflow-auto  text-ellipsis border border-slate-300"
                          >
                            {keyValue == "productImages" && (
                              <div>
                                <div className="flex relative">
                                  <div className="hidden absolute top-2 left-8 text-sm p-1 rounded-md text-white bg-slate-700">
                                    copied
                                  </div>
                                  <i
                                    className="opacity:100 sm:opacity-0 group-hover:opacity-100 px-3 fa-regular fa-copy cursor-pointer "
                                    onClick={handleCopyText}
                                  ></i>
                                  <div className="hover:underline">
                                    <a
                                      href={product[keyValue][0]}
                                      target="_blank"
                                    >
                                      {product[keyValue][0]}
                                    </a>
                                  </div>
                                </div>
                                <div className="flex relative">
                                  <div className="hidden absolute top-2 left-8 text-sm p-1 rounded-md text-white bg-slate-700">
                                    copied
                                  </div>
                                  <i
                                    className="opacity:100 sm:opacity-0 group-hover:opacity-100 px-3 fa-regular fa-copy cursor-pointer "
                                    onClick={handleCopyText}
                                  ></i>
                                  <div className="hover:underline">
                                    <a
                                      href={product[keyValue][1]}
                                      target="_blank"
                                    >
                                      {product[keyValue][1]}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            )}

                            {keyValue !== "productImages" && (
                              <div className="flex relative">
                                <div className="hidden absolute top-2 left-8 text-sm p-1 rounded-md text-white bg-slate-700">
                                  copied
                                </div>
                                <i
                                  className="opacity:100 sm:opacity-0 group-hover:opacity-100 px-3 fa-regular fa-copy cursor-pointer "
                                  onClick={handleCopyText}
                                ></i>
                                <div className="">{product[keyValue]}</div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex text-black"></div>
        </div>
        <div className="mt-10">
          <button
            className="bg-sky-600 text-white text-xl p-1 rounded-md px-4"
            onClick={(e)=>{setAddProductFormDisplay('')}}
          >
            Add Product
          </button>
          <button
            className="bg-red-500 text-white text-xl p-1 rounded-md px-4 mx-2"
            onClick={deleteProductBtn}
          >
            Delete Product(s)
          </button>
        </div>
      </div>
      <div
        className={`${addProductFormDisplay} absolute w-full top-0 bg  px-2`}
        id="addProductForm"
      >
        <Addproduct
          getSellerProducts={getSellerProducts}
          setAddProductFormDisplay={setAddProductFormDisplay}
        />
      </div>
      <div
        id="confirmdeletebox"
        className={`${confirmDeleteBoxDisplay} absolute top-60 mx-auto h-full  bg-sky- w-full  px-2`}
      >
        <div className="max-w-[500px] max-h-[350px] my-auto  mx-auto bg-white border  rounded-md drop-shadow-2xl shadow-sm shadow-slate-600 p-4 ">
          <div
            className="text-right mr-3 font-bold text-lg "
          >
            <i className="fa-solid fa-x cursor-pointer" 
             onClick={()=>{setConfirmDeleteBoxDisplay('hidden')}}></i>
          </div>
          <h1 className="text-3xl font-bold text-center my-9">
            Delete Selected Products ?
          </h1>
          <div className="flex justify-end ">
            <button className="py-2 text-black bg-slate-400 font-semibold ml-4 rounded-lg px-8" onClick={()=>{setConfirmDeleteBoxDisplay('hidden')}}>
              Cancel
            </button>
            <button
            id="confirmDeleteBtn"
              className="py-2 text-white bg-red-500 font-semibold ml-4 rounded-lg px-8"
              onClick={deleteProductsFromDatabase}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
