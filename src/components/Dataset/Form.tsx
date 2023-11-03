"use client";
import React, { useRef, useState } from "react";
import { Textarea } from "../shared/textarea";
import { Button } from "../shared/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { supabase } from "../../Helper/helper";
import { embeddings } from "../../Helper/embedding";
import { useToaster } from "../../Toaster/ToastProvider";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [loading, setLoading] = useState(false);
  const notification = useToaster();

  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    const content = inputRef.current.value.replace(/\n/g, " ");

    if (content && content.trim()) {
      const res = await embeddings(content);

      if (res.status !== 200) {
        notification.showToaster("Something went wrong", "error");
      } else {
        const result = await res.json();

        const embedding = result.embedding;
        const token = result.token;

        const { error } = await supabase.from("documents").insert({
          content,
          embedding,
          token,
        });
        if (error) {
          notification.showToaster(error.message, "error");
        } else {
          notification.showToaster("Dataset added successfully", "success");
          inputRef.current.value = "";
        }
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        className="w-half text-white bg-gray-900"
        onClick={() => navigate("/")}
      >
        Home
      </Button>
      <Textarea
        placeholder="Add your dataset"
        className="h-96 text-white"
        ref={inputRef}
      />
      <Button
        className="w-full flex gap-2 text-white bg-gray-900"
        onClick={handleSubmit}
      >
        {loading && (
          <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
        )}
        Submit
      </Button>
    </>
  );
}
