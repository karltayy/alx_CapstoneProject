import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold">Interactive Art Gallery</Link>
        <div>
          <Link to="/gallery" className="text-gray-300 px-3 hover:text-white">Gallery</Link>
          <Link to="/upload" className="text-gray-300 px-3 hover:text-white">Upload</Link>
          <Link to="/favorites" className="text-gray-300 px-3 hover:text-white">Favorites</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;