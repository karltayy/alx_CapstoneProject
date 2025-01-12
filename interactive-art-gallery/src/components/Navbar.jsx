import React from "react";
import { Link } from "react-router-dom";
import useGalleryStore from "./GalleryStore";
import Avatar from "@mui/material/Avatar";

function Navbar() {
  const { user, logoutUser } = useGalleryStore();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold">Interactive Art Gallery</Link>
        <div className="flex items-center">
          <Link to="/gallery" className="text-gray-300 px-3 hover:text-white">Gallery</Link>
          <Link to="/upload" className="text-gray-300 px-3 hover:text-white">Upload</Link>
          <Link to="/favorites" className="text-gray-300 px-3 hover:text-white">Favorites</Link>
          {user ? (
            <>
              <Link to="/profile" className="text-gray-300 px-3 hover:text-white">Profile</Link>
              {/* Use Avatar component with fallback text (first letter of the user's name) */}
              <Avatar
                alt="Profile Picture"
                src={user.profilePicture || ""}
                sx={{ width: 40, height: 40 }}
              >
                {!user.profilePicture && user.name ? user.name.charAt(0).toUpperCase() : null}
              </Avatar>
              <button
                onClick={logoutUser}
                className="text-gray-300 px-3 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-gray-300 px-3 hover:text-white">Sign In</Link>
              <Link to="/register" className="text-gray-300 px-3 hover:text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
