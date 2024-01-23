import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

export default function Signup() {

  const [profileImage,setProfileImage] = useState("https://img.freepik.com/premium-vector/art-illustration_890735-11.jpg?ga=GA1.2.1631100672.1694082200&semt=ais")
  let [eyeIcon, setEyeIcon] = useState("fa-eye-slash");
  let [eyeIconConfirmPassword, setEyeIconConfirmPassword] = useState("fa-eye-slash");
  let [passwordFieldType,setPasswordFieldType] = useState('password')
  let [confirmPasswordFieldType,setConfirmPasswordFieldType] = useState('password')

  const {register,handleSubmit,watch, formState:{errors}} = useForm()


  const onSubmit = async(data) => {
    if(data.password !== data.confirmPassword){
      alert('Password did not match!')
      return null
    }

    const formData = new FormData()
    formData.append('fullname',data.fullname)
    formData.append('email',data.email)
    formData.append('password',data.password)
    formData.append('profilePhoto',data.profilePhoto[0])
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/seller/createSellerAccount', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const seller = await response.json();
      console.log('User registered successfully:', seller);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  }
  
  const toggleShowPassword = () => {
    if (passwordFieldType === "password") {
      setPasswordFieldType('text')
      setEyeIcon("fa-eye");
    } else {
      setPasswordFieldType('password')
      setEyeIcon("fa-eye-slash");
    }
  };

  const toggleShowConfirmPassword = () =>{
    if (confirmPasswordFieldType === "password") {
      setConfirmPasswordFieldType('text')
      setEyeIconConfirmPassword("fa-eye");
    } else {
      setConfirmPasswordFieldType('password')
      setEyeIconConfirmPassword("fa-eye-slash");
    }
  }

  
  const profilepic = watch('profilePhoto')

  function previewFile() {
    const fileInput = document.getElementById('profilePhoto')
    
    const file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var imageUrl = e.target.result;
        setProfileImage(imageUrl)
        document.getElementById('fileLabel').innerHTML='Change Profile Picture'
      };

      reader.readAsDataURL(file);

    }
  }

  useEffect(()=>{
    previewFile()
  },[profilepic])
  

  return (
    <div className="flex  max-w-[1200px] mx-auto mt-10 md:px-10">
      <div className="flex flex-col mx-auto">
        {/* signup form */}
        <h2 className="font-bold text-3xl text-center">
          Signup TO Become a BucketBuy Seller
        </h2>

        <div className="flex justify-center my-3 mt-10">
          <div className={``} id="profilePhotoPreview">
            <img src={`${profileImage}`} className="h-40 w-40 rounded-full border-2 border-slate-300  object-cover" alt="" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
             <div className="bg-sky-600 p-2 rounded-full text-white font-semibold cursor-pointer">
             <label htmlFor="profilePhoto" id="fileLabel" className="cursor-pointer">Upload Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                className="w-0.5 opacity-0"
                accept="image/*"
                // onChange={previewFile}
                {...register('profilePhoto',{required:true})}
              />
             </div>
          </div>
          <div className="w-full flex flex-col pt-5">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="border border-slate-300"
              {...register('fullname',{minLength:3},)}
            />
            {errors.fullname && <span className="text-red-500">*Name should be atleast 3 character long</span>}
          </div>
          <div className="w-full flex flex-col mt-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-slate-300"
              {...register('email',{pattern:/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm})}
            />
            {errors.email && <span className="text-red-500">*Please enter a valid email!</span>}
          </div>
          <div className="w-full flex flex-col mt-5 relative">
          <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  id="password"
                  type={passwordFieldType}
                  name="password"
                  placeholder="password"
                  className="border rounded-md p-2 w-full focus:outline-slate-500"
                  {...register('password',{minLength:8})}
                />
                {errors.password && <span className="text-red-500">*Password should be atleast 8 characters long!</span>}
                <span
                  className="cursor-pointer opacity-80 absolute right-3 top-8"
                  onClick={toggleShowPassword}
                >
                  <i className={`fa-solid ${eyeIcon}`}></i>
                </span>
          </div>
          <div className="w-full flex flex-col mt-5 relative">
          <label htmlFor="confirmPassword" className="">
            Confirm Password 
                </label>
                <input
                  id="confirmPassword"
                  type={confirmPasswordFieldType}
                  name="confirmPassword"
                  placeholder="re-enter password"
                  className={`border rounded-md p-2 w-full focus:outline-slate-500`}
                  {...register('confirmPassword')}
                />
                {}
                <span
                  className="cursor-pointer opacity-80 absolute right-3 top-8"
                  onClick={toggleShowConfirmPassword}
                >
                  <i className={`fa-solid ${eyeIconConfirmPassword}`}></i>
                </span>
          </div>
          <div className="w-full flex flex-col mt-5">
            <input
              type="submit"
              name="submit"
              value="Become a bucketbuy seller"
              id=""
              className="border border-slate-300 text-white bg-sky-500 p-1 rounded-md font-semibold text-lg  cursor-pointer"
              required
            />
          </div>
          <div className="mt-4">
            <NavLink to="/login" className="hover:font-semibold underline">Already have an account? Login</NavLink>
        </div>
        </form>
      </div>
      <div className="hidden md:flex flex-col">
        {/* display vector image */}
        <img src="https://img.freepik.com/free-vector/newsstand-concept-illustration_114360-15989.jpg?ga=GA1.1.1631100672.1694082200&semt=ais" alt="" />
        </div>

        
    </div>
  );
}
