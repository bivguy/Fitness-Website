import React, { useState } from "react";
import {
  verifyAccountName,
  verifyEmail,
  verifyDOB,
  verifyPhone,
  verifyZip,
} from "./verification";

import "./../../App.css";
import { useNavigate } from "react-router-dom";

import axios from "../../axios";

function RegForm(props) {
  const form = props.form;
  const { register, control, handleSubmit, formState, getValues } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  //Verify Passwords

  const verifyPasswords = () => {
    const { password, confirm_password } = getValues();
    if (password !== confirm_password) {
      return "Passwords don't match";
    } else {
      return true;
    }
  };

  const onSubmit = async (data) => {
    // data.preventDefault();
    const { password } = getValues();

    // Doing the backend funcitonality
    const response = await axios.post("/register", {
      displayname: data.displayname,
      username: data.name,
      password: password,
      email: data.email,
      dob: data.DOB,
      phone: data.phone,
      zipcode: data.zipcode,
      headline: "I'm new!",
    });

    if (response.data.result === "success") {
      navigate("/MainPage");
    } else if (response.data.error === "username taken") {
      window.alert("Username is already taken");
    }
  };

  return (
    <div className="form-container">
      <form
        className="form"
        id="reg-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="form-type-header">Sign Up</h1>
        <p onClick={props.toggleForm} className="toggleForm">
          Already have an account?
        </p>
        <div className="form-items">
          <div className="two-column">
            <div className="form-item">
              <label htmlFor="name">Account Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "username is required",
                  },
                  validate: verifyAccountName,
                })}
              />
              <p className="error">{errors.name?.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="displayname">Display Name</label>
              <input
                type="text"
                id="displayname"
                placeholder="Enter Display Name"
                {...register("displayname")}
              />
            </div>
            <p className="error"></p>
          </div>
          <div className="two-column">
            <div className="form-item">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@email.etc"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                  validate: verifyEmail,
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-item">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="123-123-1234"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "phone is required",
                  },
                  validate: verifyPhone,
                })}
              />
              <p className="error">{errors.phone?.message}</p>
            </div>
          </div>
          <div className="two-column">
            <div className="form-item">
              <label htmlFor="DOB">Date of Birth</label>
              <input
                type="date"
                id="DOB"
                {...register("DOB", {
                  required: {
                    value: true,
                    message: "DOB is required",
                  },
                  validate: verifyDOB,
                })}
              />
              <p className="error">{errors.DOB?.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="name">Zipcode</label>
              <input
                type="tel"
                id="zipcode"
                placeholder="ex. 12345"
                pattern="[0-9]{5}"
                {...register("zipcode", {
                  required: {
                    value: true,
                    message: "Zipcode is required",
                  },
                  validate: verifyZip,
                })}
              />
              <p className="error">{errors.zipcode?.message}</p>
            </div>
          </div>

          <div className="two-column">
            <div className="form-item">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  validate: verifyPasswords,
                })}
              />
              <p className="error">{errors.password?.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "Please confirm your password",
                  },
                  validate: verifyPasswords,
                })}
              />
              <p className="error">{errors.confirm_password?.message}</p>
            </div>
          </div>
          <div className="registration-buttons">
            <button type="submit" className="button">
              Submit
            </button>

            <button type="reset" className="button">
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegForm;
