"use client";
import React, { useState } from "react";
import Form from "../shared/Form";
import { ToastType, supabase } from "../../Helper/helper";
import { useNavigate } from "react-router-dom";
import { Button } from "../shared/button";
import { useToast } from "react-toastify";
import { useToaster } from "../../Toaster/ToastProvider";

export default function SignupComponent() {
  const navigate = useNavigate();
  const notification = useToaster();

  const handleSignup = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(error);
    console.log(data);
    if (error) {
      notification.showToaster(error.message, "error");
    } else {
      notification.showToaster(
        "Account created successfully verify your email",
        "success"
      );
      navigate("/");
    }
  };

  return (
    <div>
      <div className=" w-full h-screen flex justify-center items-center">
        <div className="w-96 border shadow-sm p-5 rounded-sm space-y-3">
          <h1 className=" font-bold text-lg text-white">
            Register your account in ChatBot
          </h1>

          <Form
            submitText="Sign up with Email and Password"
            callback={handleSignup}
          />
          <h1> Already have an account</h1>
          <Button
            className="w-25 mt-3 bg-gray-900 text-white"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
