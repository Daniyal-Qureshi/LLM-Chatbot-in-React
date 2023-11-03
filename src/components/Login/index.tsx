"use client";
import React, { useState } from "react";
import Form from "../shared/Form";
import { ToastType, supabase } from "../../Helper/helper";
import { Button } from "../shared/button";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { useToast } from "react-toastify";
import { useToaster } from "../../Toaster/ToastProvider";

function LoginComponent() {
  const navigate = useNavigate();
  const [toaster, showToaster] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("error");
  const signIn = useSignIn();
  const notification = useToaster();

  const handleSignIn = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      notification.showToaster(error.message, "error");
    } else {
      signIn({
        token: data.session?.access_token ?? "",
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email },
      });
      navigate("/");
    }
  };

  return (
    <div>
      <div className=" w-full h-screen flex justify-center items-center">
        <div className="w-96 border shadow-sm p-5 rounded-sm space-y-3">
          <h1 className="font-bold text-lg text-white">Login to Chatbot</h1>

          <Form
            submitText="Sign in with Email and Password"
            callback={handleSignIn}
          />
          <h1> Don't have an account consider</h1>
          <Button
            className="w-25 mt-3 bg-gray-900 text-white"
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

export default LoginComponent;
