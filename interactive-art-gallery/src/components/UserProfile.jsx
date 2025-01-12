import React, { useState } from "react";
import useGalleryStore from "./GalleryStore";
import Avatar from "@mui/material/Avatar";

function UserProfile() {
  const { user, updateUserProfilePicture } = useGalleryStore();
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        updateUserProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
        {user ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-gray-700">Profile Picture:</label>
              <div className="flex items-center space-x-4">
                {/* Use Avatar component with fallback text (first letter of the user's name) */}
                <Avatar
                  alt="Profile Picture"
                  src={profilePicture || ""}
                  sx={{ width: 80, height: 80 }}
                >
                  {!profilePicture && user.name ? user.name.charAt(0).toUpperCase() : null}
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">You are not signed in.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
