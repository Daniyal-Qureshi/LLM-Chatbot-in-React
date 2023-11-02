"use client";
import React, { useState } from "react";
import Form from "../shared/Form";
import { createClient } from "@supabase/supabase-js";
import Toaster from "../shared/toaster";
import { ToastType, supabase } from "../../Helper/helper";
import { Button } from "../shared/button";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const navigate = useNavigate();
  const [toaster, showToaster] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("error");

  const handleSignIn = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setType("error");
      setMessage(error.message);
      showToaster(true);
    } else {
      navigate("/home");
    }
  };

  return (
    <div>
      {toaster && <Toaster type={type} message={message} />}
      <div className=" w-full h-screen flex justify-center items-center">
        <div className="w-96 border shadow-sm p-5 rounded-sm space-y-3">
          <h1 className=" font-bold text-lg">{"Welcome to Daily's AI"}</h1>
          <p className="text-sm">
            It is platform that build using Supabase and Chatgpt's API to create
            a ChatGPT like that can answer with our own knowledeg base
          </p>
          <Form
            submitText="Sign in with Email and Password"
            callback={handleSignIn}
          />
          <h1> Don't have an account consider</h1>
          <Button
            className="w-25 mt-3 bg-black text-white"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
