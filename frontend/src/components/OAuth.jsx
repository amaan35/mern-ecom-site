import React from "react";
import googlelogo from "../assets/googlelogo.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signedIn } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const accountResults = await signInWithPopup(auth, provider);
      const res = await fetch("/auth/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: accountResults.user.displayName,
          email: accountResults.user.email,
          profilePic: accountResults.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signedIn(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        className="border-2 border-yellow-400 bg-gradient-to-r from-green-400 to-blue-400 hover:opacity-85 text-black flex items-center justify-center gap-2 py-3 rounded-lg font-semibold"
        type="button"
        onClick={handleGoogleAuth}
      >
        <img src={googlelogo} className="w-[25px]" /> Sign in with Google
      </button>
    </>
  );
};

export default OAuth;
