import React, { useRef, useState } from "react";
import { BsRobot } from "react-icons/bs";
import { PiSealQuestionThin } from "react-icons/pi";
import { stripIndent, oneLine } from "common-tags";
import { supabase } from "../../Helper/helper";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { embeddings } from "../../Helper/embedding";
import chat from "../../Helper/chat";
import PdfExtraction from "./pdf";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

function Home() {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [questions, setQuestion] = useState<string[]>([]);
  const [answers, setAnswer] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    signOut();
    navigate("/signin");
  };

  const toastError = (message = "Something went wrong") => {};

  const handleSearch = async () => {
    setLoading(true);
    const searchText = inputRef.current.value;

    if (searchText && searchText.trim()) {
      setQuestion((currentQuestion) => [...currentQuestion, searchText]);
      const res = await embeddings(searchText);
      if (res.status !== 200) {
        toastError();
      } else {
        console.log("res from embeddings is ", res);
        const data = await res.json();
        console.log("Data is ", data);
        const response = await supabase.rpc("match_documents", {
          query_embedding: data.embedding,
          match_threshold: 0.5,
          match_count: 1,
        });

        console.log(response);
        const documents: any = response.data;

        let tokenCount = 0;
        let contextText = "";
        for (let i = 0; i < documents.length; i++) {
          const document = documents[i];
          const content = document.content;
          tokenCount += document.token;

          if (tokenCount > 1500) {
            break;
          }
          contextText += `${content.trim()}\n--\n`;
        }
        if (contextText) {
          const prompt = generatePrompt(contextText, searchText);
          await generateAnswer(prompt);
        } else {
          setAnswer((currentAnswer) => [
            ...currentAnswer,
            "Sorry there is no context related to this question",
          ]);
        }
      }
    }
    inputRef.current.value = "";
    setLoading(false);
  };
  const generateAnswer = async (prompt: string) => {
    const res = await chat(prompt);
    if (res.status !== 200) {
      toastError();
    } else {
      const data = await res.json();
      setAnswer((currentAnswer) => [...currentAnswer, data.choices[0].text]);
    }
  };

  const setPromptText = (text: string) => {
    inputRef.current.value = text;
  };

  const generatePrompt = (contextText: string, searchText: string) => {
    const prompt = stripIndent`${oneLine`
    You are a very enthusiastic DailyAI representative who loves
    to help people! Given the following sections from the DailyAI
    documentation, answer the question using only that information,
    outputted in markdown format. If you are unsure and the answer
    is not explicitly written in the documentation, say
    "Sorry, I don't know how to help with that."`}

    Context sections:
    ${contextText}

    Question: """
    ${searchText}
    """

    Answer as markdown (including related code snippets if available):
  `;
    return prompt;
  };

  return (
    <div className="flex justify-center w-screen h-screen p-2">
      <div className="w-1/2">
        <div className="flex-1 h-80vh overflow-y-auto space-y-10">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <BsRobot className="w-5 h-5" />
              <h1 className="text-white">Your CHATBOT</h1>
            </div>
            <div>
              <Button onClick={handleLogout} className="text-white bg-gray-900">
                Logout
              </Button>
              <Button
                className="ml-3 text-white bg-gray-900"
                onClick={() => {
                  navigate("/dataset");
                }}
              >
                Add Dataset
              </Button>
            </div>
          </div>
          {questions.map((question, index) => {
            const answer = answers[index];

            const isLoading = loading && !answer;

            return (
              <div className="space-y-3" key={index}>
                <div className="flex items-center gap-2 text-indigo-500">
                  <PiSealQuestionThin className="w-5 h-5" />
                  <h1 className="text-white">{question}</h1>
                </div>
                {isLoading ? (
                  <h1 className="text-white">Loading...</h1>
                ) : (
                  <p className="text-white">{answer}</p>
                )}
              </div>
            );
          })}
        </div>
        <Input
          ref={inputRef}
          placeholder="Ask your question"
          className="p-5 mt-3 text-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <PdfExtraction setPromptText={setPromptText} />
      </div>
    </div>
  );
}

export default Home;
