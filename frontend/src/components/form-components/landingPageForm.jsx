import React from "react";
import LoginForm from "./loginForm";
import RegForm from "./regForm";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

import "./../../App.css";
function LandingPageForm() {
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const toggleForm = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const form = useForm();
  const { register, control } = form;

  return (
    <div>
      {isLoginVisible ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegForm toggleForm={toggleForm} form={form} />
      )}
    </div>
  );
}

export default LandingPageForm;
