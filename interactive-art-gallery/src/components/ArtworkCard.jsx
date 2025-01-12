import React, { useState } from "react";
import useGalleryStore from "./GalleryStore";

function ArtworkCard({ artwork }) {
  const { addFavorite, removeFavorite } = useGalleryStore();
  const isFavorite = useGalleryStore((state) =>
    state.favorites.some((fav) => fav.id === artwork.id)
  );

  // New local state to control fullscreen overlay
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
      {/* Main card container with a subtle hover scale effect (optional) */}
      <div
        className="
          bg-white rounded shadow p-4
          transform transition-transform duration-200 hover:scale-105
        "
      >
        {/* Clickable image: toggles the isFullscreen state */}
        <img
          src={artwork.image} // The artwork image URL
          alt={artwork.title}
          className="w-full h-48 object-cover rounded cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        />
        <h3 className="mt-2 font-bold text-lg">{artwork.title}</h3>
        <p className="text-gray-600">{artwork.description}</p>

        {/* Display the uploader's name and the upload timestamp */}
        <div className="mt-2 text-sm text-gray-500">
          <p>Uploaded by: {artwork.uploadedBy}</p>
          <p>Uploaded at: {artwork.uploadedAt}</p>
        </div>

        <button
          onClick={handleFavoriteClick}
          className={`mt-4 py-1 px-4 rounded text-white ${
            isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>

      {/* Fullscreen overlay (modal) - visible only if isFullscreen is true */}
      {isFullscreen && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-black bg-opacity-80
          "
        >
          {/* Display the artwork image in an enlarged view */}
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-h-full max-w-full object-contain"
          />
          {/* Close button to exit fullscreen */}
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
