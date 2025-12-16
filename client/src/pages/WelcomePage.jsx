import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1600);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0215] via-[#141028] to-[#0B0215] text-white">
      <div className="flex flex-col items-center gap-4 animate-fadeScale">
        <img src={assets.logo_big} alt="Yapster" className="w-20" />

        <h1 className="text-3xl font-semibold tracking-wide">Yapster</h1>

        <p className="text-sm text-gray-400">
          Conversations that feel alive
        </p>

        <div className="flex gap-1 mt-2">
          <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-150" />
          <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
