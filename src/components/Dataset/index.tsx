import React, { useEffect } from "react";
import { supabase } from "../../Helper/helper";
import { redirect } from "react-router-dom";
import { BsDatabase } from "react-icons/bs";
import Form from "./Form";
import { useToaster } from "../../Toaster/ToastProvider";

export default function Dataset() {
  const notification = useToaster();
  useEffect(() => {
    notification.showToaster(
      "Make Sure to have Admin Role in Supabase",
      "info"
    );
  }, []);
  return (
    <div className="max-w-4xl mx-auto h-screen flex justify-center items-center">
      <div className="w-full p-5 space-y-3">
        <div className="flex items-center gap-2">
          <BsDatabase className="w-5 h-5" />
          <h1 className="text-white">
            Add your dataset to improve performance
          </h1>
        </div>
        <Form />
      </div>
    </div>
  );
}
