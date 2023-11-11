import React, { useEffect, useRef } from "react";
import { BsDatabase } from "react-icons/bs";
import Form from "./Form";
import { useToaster } from "../../Toaster/ToastProvider";
import PdfExtraction from "../Home/pdf";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Dataset() {
  const notification = useToaster();
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const setPromptText = (text: string) => {
    inputRef.current.value = text;
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex justify-center items-center">
      <div className="w-full p-5 space-y-3">
        <p className="text-white text-3xl">Data Sources</p>
        <div className="flex items-center gap-2">
          <BsDatabase className="w-5 h-5" />
        </div>
        <Form inputRef={inputRef} />
        <PdfExtraction setPromptText={setPromptText} />
      </div>
    </div>
  );
}
