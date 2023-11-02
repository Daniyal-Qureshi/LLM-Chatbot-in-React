"use client";
import React, { useState } from "react";
import Form from "../shared/Form";
import { ToastType, supabase } from "../../Helper/helper";
import Toaster from "../shared/toaster";
import { useNavigate } from "react-router-dom";
import { Button } from "../shared/button";

export default function SignupComponent() {
  const navigate = useNavigate();

  const [toaster, setToaster] = useState({
    visible: false,
    message: "",
    type: "",
  });

  const handleSignup = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(error);
    console.log(data);
    if (error) {
      setToaster({
        visible: true,
        message: error.message,
        type: "error",
      });
    } else {
      setToaster({
        visible: true,
        message: "Signup Successful",
        type: "success",
      });
      navigate("/");
    }
  };

  return (
    <div>
      {toaster.visible && (
        <Toaster type={toaster.type as ToastType} message={toaster.message} />
      )}
      <div className=" w-full h-screen flex justify-center items-center">
        <div className="w-96 border shadow-sm p-5 rounded-sm space-y-3">
          <h1 className=" font-bold text-lg">{"Welcome to Daily's AI"}</h1>
          <p className="text-sm">
            {
              " It is platform that build using Supabase and Chatgpt's API to create a ChatGPT like that can answer with our own knowledeg base."
            }
          </p>
          <Form
            submitText="Sign up with Email and Password"
            callback={handleSignup}
          />
          <h1> Already have an account</h1>
          <Button
            className="w-25 mt-3 bg-black text-white"
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
