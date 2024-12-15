import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import service from "../Appwrite/config";
import { login2 as authLogin } from "../Store/authslice";

function CounsellorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  // Access the store value
  const authStatus_counc = useSelector((state) => state.auth.councellor_status);

  // Update local storage whenever authStatus_counc changes
  useEffect(() => {
    if (authStatus_counc !== undefined) {
      localStorage.setItem("councellor_status", JSON.stringify(authStatus_counc));
      
    }
  }, [authStatus_counc]);

  const login = async (data) => {
    setError("");
    try {
      // Call the authenticateCounsellor function
      const response = await service.authenticateCounsellor({
        Enroll: data.enroll,
        Email: data.email,
        Password: data.password,
      });
  
      if (response && !response.error) {
        console.log("Matched Document:", response.documents[0]); // Log the matched document
  
        // Store all counsellor data in local storage
        const matchedCounsellor = response.documents[0];
        localStorage.setItem("councellor_status", JSON.stringify(true)); // Status for authentication
        localStorage.setItem("Enroll", matchedCounsellor.Enroll); // Store Enroll separately
        localStorage.setItem("councellor_data", JSON.stringify(matchedCounsellor)); // Store all data
  
        // Dispatch the login action with the matched counsellor data
        dispatch(authLogin({ cd: matchedCounsellor }));
  
        // Navigate to the counsellor dashboard
        navigate("/councellor");
      } else {
        setError(response.error || "Authentication failed. Please check your details.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Counsellor Login</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <span className="font-medium text-primary transition-all duration-200 hover:underline">
            Contact Admin
          </span>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Enrollment Number: "
              placeholder="Enter your enrollment number"
              type="text"
              {...register("enroll", { required: true })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CounsellorLogin;
