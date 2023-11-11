"use client";

import React, { RefObject, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../shared/textarea";
import { Button } from "../shared/button";
import { supabase } from "../../Helper/helper";
import { embeddings } from "../../Helper/embedding";
import { useToaster } from "../../Toaster/ToastProvider";
import PropTypes, { InferProps, number } from "prop-types";
import ProgressBar from "@ramonak/react-progress-bar";

interface ChildProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const Form = ({ inputRef }: ChildProps) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Step 2

  const notification = useToaster();
  const navigate = useNavigate();

  function paragraphToSentences(paragraph: string) {
    const sentenceRegex = /(?<=[.!?])\s+/;
    const sentences = paragraph.split(sentenceRegex);
    const nonEmptySentences = sentences.filter(
      (sentence) => sentence.trim() !== ""
    );

    return nonEmptySentences;
  }

  async function createEmbedding(content: string) {
    const res = await embeddings(content);
    if (res.status !== 200) {
      throw new Error("Failed to create embedding");
    }

    const result = await res.json();
    const { embedding, token } = result;

    const { error } = await supabase.from("documents").insert({
      content,
      embedding,
      token,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const content = inputRef.current?.value.replace(/\n/g, " ");
      const sentences = paragraphToSentences(content as string);

      // Use Promise.all to wait for all promises to resolve
      for (let i = 0; i < sentences.length; i++) {
        await createEmbedding(sentences[i]);
        setProgress(Math.floor((i / sentences.length) * 100)); // Step 3
      }

      notification.showToaster("Dataset added successfully", "success");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      navigate("/");
    } catch (error) {
      notification.showToaster("something went wrong", "error");
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="w-half text-white bg-gray-900 mt-3"
        onClick={() => navigate("/")}
      >
        Home
      </Button>
      <Textarea
        placeholder="Add your dataset"
        className="h-96 text-white"
        ref={inputRef}
      />
      <ProgressBar
        animateOnRender={true}
        completed={progress}
        bgColor="#000"
        className="mt-3"
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
};
export default Form;
