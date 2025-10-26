import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getToken, decodeRole } from "./utils/auth";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Authentication/login";
import Register from "./pages/Authentication/register";
import Home from "./pages/User/Home";
import Rooms from "./pages/User/Rooms";
import Profile from "./pages/User/Profile";
import NotFound from "./pages/NotFound";

const App = () => {
  // Decode token and get full user object
  const token = getToken();
  const user = token ? decodeRole(token, true) : null; // full payload: id, username, email, role

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/rooms/:hotelId" element={<Rooms user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;