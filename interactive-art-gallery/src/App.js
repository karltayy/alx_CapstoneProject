import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import GalleryPage from "./components/GalleryPage";
import UploadPage from "./components/UploadPage";
import FavoritesPage from "./components/FavoritesPage";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
         {/* Other Routes */}
  <Route path="/signin" element={<SignIn />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;