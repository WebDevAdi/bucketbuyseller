import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useForm,} from 'react-hook-form'
import { setSeller, clearSeller } from "../../features/authSlice";
import { useDispatch } from "react-redux";


export default function Login() {

  const {register,handleSubmit,formState:{errors}} = useForm()

  let [eyeIcon, setEyeIcon] = useState("fa-eye-slash");
  let [passwordFieldType,setPasswordFieldType] = useState('password')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    
    let invalidCredentialsMessage = document.getElementById('invalidCredentials')
    
    try {
    if(!invalidCredentialsMessage.classList.contains('hidden')){
      invalidCredentialsMessage.classList.add('hidden')
    }
     const loginSeller = await fetch('/api/v1/seller/login',{
       method:'POST',
       headers:{
         'Content-Type':'application/json'
       },
       body:JSON.stringify(data)
     })
 
     const seller = await loginSeller.json()
 
     console.log(seller)
 
     if(!seller){
       return null;
       
      }
      
      dispatch(setSeller(seller.data))
      navigate('/dashboard')
      
    } catch (error) {
      invalidCredentialsMessage.classList.remove('hidden')
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


  return (
    <>
      <div className="flex max-w-[1200px] m-auto py-3">
        <div className="flex items-center px-10 md:px-0 ">
          <div className="hidden md:flex">
            {/* Image */}
            <img
              className=" "
              src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?ga=GA1.2.1631100672.1694082200&semt=ais"
              alt=""
            />
          </div>
          <div className="flex flex-col md:my-0">
            <h1 className="font-bold text-3xl pb-5">
              Welcome Back. Please Log In To Your Seller Account.
            </h1>

            <form className="flex flex-col items-start" onSubmit={handleSubmit(onSubmit)}>
              {/* user email */}
              <div className="flex flex-col mt-8 w-full">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="border rounded-md p-2 w-full focus:outline-slate-500"
                  {...register('email',{pattern:/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm})}
                />
                
                {errors.email && <p className="text-red-500 pt-1">*Please enter a valid email!</p> }
              </div>

              {/* user password */}

              <div className="flex flex-col mt-8 w-full relative">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  id="password"
                  type={passwordFieldType}
                  name="password"
                  placeholder="password"
                  className="border rounded-md p-2 w-full focus:outline-slate-500"
                  required
                  {...register('password')}
                />
                <span
                  className="cursor-pointer opacity-80 absolute right-4 top-8"
                  onClick={toggleShowPassword}
                >
                  <i className={`fa-solid ${eyeIcon}`}></i>
                </span>
              </div>
              <p id="invalidCredentials" className="hidden py-2 text-red-500">*Inavid Email or Password. Please Try Again</p>
              {/* remember me checkbox */}

              <div className="w-full flex justify-between mt-8">
                <div className="flex">
                  <input
                    type="checkbox"
                    name="stayLoggedIn"
                    id="stayLoggedIn"
                    className="cursor-pointer"
                    {...register('rememberMe')}
                  />
                  <label htmlFor="stayLoggedIn" className="px-2 cursor-pointer hover:font-semibold">
                    Remember Me
                  </label>
                </div>

                <div className="text-red-500 text-bold cursor-pointer hover:underline hover:font-semibold">
                  Forgot Password?
                </div>
              </div>

              {/* submit button */}
              <input
                type="submit"
                value="Login"
                className="w-full bg-sky-500 rounded-xl p-3 mt-8 text-white font-bold"
              />
            </form>
            <div className="py-4 underline cursor-pointer">
              <NavLink className='hover:font-semibold' to="/signup">
                Don't have an account? Create new account
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
