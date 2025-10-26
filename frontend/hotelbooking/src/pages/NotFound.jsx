import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page not found.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-black px-6 py-2 rounded hover:bg-blue-600 font-semibold"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
