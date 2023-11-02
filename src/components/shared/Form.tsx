import React from "react";
import { Input } from "./input";
import { Button } from "./button";

function Form(props: any) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        type="password"
        className="mt-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className="w-full bg-indigo-500 mt-3 text-white
        "
        onClick={() => props.callback(email, password)}
      >
        {props.submitText}
      </Button>
    </div>
  );
}

export default Form;
