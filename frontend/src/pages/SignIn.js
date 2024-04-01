import React, { useState } from "react";
import ecomsigninpic from "../assets/ecomsigninpic.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signedIn } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
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
      !formdata.username ||
      !formdata.password ||
      formdata.username === "" ||
      formdata.password === ""
    ) {
      return setShowError("Please fill out all fields");
    }
    try {
      setLoading(true);
      setShowError(null);
      const res = await fetch("/auth/signin", {
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
        dispatch(signedIn(data));
        navigate("/");
      }
    } catch (error) {
      setShowError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-[90vh] justify-evenly items-center">
      <div className="w-[50vw] lg:flex hidden">
        <img src={ecomsigninpic} />
      </div>
      <div className="space-y-5">
        <h2 className="text-3xl font-semibold text-center">Sign In</h2>
        <p className="text-center">
          Dont have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="cursor-pointer text-blue-500"
          >
            Sign up
          </span>
        </p>
        <form
          className="flex flex-col bg-gradient-to-r from-cyan-600 to-blue-600 text-white border shadow-md gap-5 p-5"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center">
            <label>Enter your username : </label>
            <input
              placeholder="username"
              id="username"
              type="username"
              className="border rounded-md px-3 py-1"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label>Enter your password :</label>
            <input
              placeholder="password"
              id="password"
              type="password"
              className="border rounded-md px-3 py-1"
              onChange={handleChange}
            />
          </div>
          <button
            className={`bg-yellow-400 hover:bg-yellow-500 text-black rounded-md px-3 py-1 ${
              loading ? "opacity-50" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
          <OAuth/>
          {showError && (
            <span className="text-white text-center">{showError}</span>
          )}
        </form>
      </div>
    </div>
  );
}
