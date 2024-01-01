import React from "react";
import LandingPageForm from "../components/form-components/landingPageForm";
import { useState } from "react";
import Header from "../components/form-components/header";
import usersData from "../json-users/users";

function LandingPage() {
  return (
    <div>
      <Header />
      <LandingPageForm />
    </div>
  );
}

export default LandingPage;
