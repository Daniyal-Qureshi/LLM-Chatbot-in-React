import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToasterProps {
  message: string;
  type: "success" | "error" | "info" | "default";
}

export default function Toaster({ message, type }: ToasterProps) {
  const notify = () => {
    toast(message, { type });
  };

  useEffect(() => {
    notify();
  }, []);
  return (
    <div>
      <ToastContainer theme="dark" />
    </div>
  );
}
