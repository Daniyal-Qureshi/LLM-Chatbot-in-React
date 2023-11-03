import React from "react";
import { Input } from "./input";
import { Button } from "./button";

function Form(props: any) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="mt-3">
      <Input
        placeholder="Email"
        value={email}
        className="text-white"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        type="password"
        className="mt-3 text-white"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className="w-full bg-gray-700 mt-3 text-white
        "
        onClick={() => props.callback(email, password)}
      >
        {props.submitText}
      </Button>
    </div>
  );
}

export default Form;
