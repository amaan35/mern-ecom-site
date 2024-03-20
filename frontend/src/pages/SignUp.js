import React, { useState } from "react";
import ecomshoppic from "../assets/ecomshoppic.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signedUp } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({});
  const [showError, setShowError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formdata.email ||
      !formdata.username ||
      !formdata.password ||
      formdata.email === "" ||
      formdata.username === "" ||
      formdata.password === ""
    ) {
      return setShowError("Please fill out all fields");
    }
    try {
      setLoading(true);
      setShowError(null);
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (!res.ok) {
        return setShowError(data);
      } else {
        setLoading(false);
        setShowError(null);
        dispatch(signedUp(data));
        navigate("/");
      }
    } catch (error) {
      setShowError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-[90vh]">
      <div className="w-[50%] lg:flex hidden">
        <img src={ecomshoppic} className="object-cover" />
      </div>
      <div className="lg:w-[50%] w-full flex flex-col gap-5 justify-center items-center">
        <h2 className="text-3xl font-semibold">Sign Up</h2>
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="cursor-pointer text-blue-500"
          >
            Sign in
          </span>
        </p>
        <form
          className="flex flex-col bg-gray-100 w-[90%] lg:w-[90%] md:w-[70%] border shadow-lg gap-5 p-6"
          onSubmit={handleSubmit}
        >
          <label>Enter your email : </label>
          <input
            placeholder="email"
            id="email"
            type="email"
            className="border rounded-md px-3 py-1"
            onChange={handleChange}
          />
          <label>Enter your username : </label>
          <input
            placeholder="username"
            id="username"
            type="username"
            className="border rounded-md px-3 py-1"
            onChange={handleChange}
          />
          <label>Enter your password : </label>
          <input
            placeholder="password"
            id="password"
            type="password"
            className="border rounded-md px-3 py-1"
            onChange={handleChange}
          />
          <button
            className={`bg-blue-800 text-white rounded-md px-3 py-1 ${
              loading ? "opacity-50" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
          <OAuth/>
          {showError && (
            <span className="text-red-500 text-center">{showError}</span>
          )}
        </form>
      </div>
    </div>
  );
}
