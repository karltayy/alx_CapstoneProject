import React, { useState } from "react";
import useGalleryStore from "./GalleryStore";

function ArtworkCard({ artwork }) {
  const { addFavorite, removeFavorite } = useGalleryStore();
  const isFavorite = useGalleryStore((state) =>
    state.favorites.some((fav) => fav.id === artwork.id)
  );

  // For fullscreen feature (optional)
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(artwork.id);
    } else {
      addFavorite(artwork);
    }
  };

  return (
    <>
      <div
        className="
          bg-white rounded shadow p-4
          transform transition-transform duration-200 hover:scale-105
        "
      >
        {/* Clickable image for fullscreen (optional) */}
        <img
          src={artwork.image} 
          alt={artwork.title}
          className="w-full h-48 object-cover rounded cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        />
        <h3 className="mt-2 font-bold text-lg">{artwork.title}</h3>
        <p className="text-gray-600">{artwork.description}</p>

        {/* Display the uploader's name and the upload timestamp */}
        <div className="mt-2 text-sm text-gray-500">
          <p>Uploaded by: {artwork.uploadedBy || "Unknown"}</p>
          <p>Uploaded at: {artwork.uploadedAt || "N/A"}</p>
        </div>

        <button
          onClick={handleFavoriteClick}
          className={`mt-4 py-1 px-4 rounded text-white ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>

      {/* Fullscreen overlay (if needed) */}
      {isFullscreen && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center 
            bg-black bg-opacity-80
          "
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-h-full max-w-full object-contain"
          />
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-5 right-5 text-white text-3xl focus:outline-none"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}

export default ArtworkCard;
