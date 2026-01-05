import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import WelcomePage from "./pages/WelcomePage";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900/90 to-black text-white">
     

      <Toaster />

      <Routes>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/welcome"
          element={authUser ? <WelcomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />

        <Route path="/help" element={<HelpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
