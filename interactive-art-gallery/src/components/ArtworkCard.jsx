import React, { useState } from "react";
import useGalleryStore from "./GalleryStore";

function ArtworkCard({ artwork }) {
  // Get the entire favorites dictionary
  const favorites = useGalleryStore((state) => state.favorites);
  const addFavorite = useGalleryStore((state) => state.addFavorite);
  const removeFavorite = useGalleryStore((state) => state.removeFavorite);

  // Artwork is a favorite if it exists in the dictionary
  const isFavorite = useGalleryStore((state) =>
    state.favorites.some((fav) => fav.id === artwork.id)
  );
  

  // Fullscreen overlay state
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Zoom state for the fullscreen image
  const [isZoomed, setIsZoomed] = useState(false);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(artwork.id);
    } else {
      addFavorite(artwork);
    }
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    setIsZoomed(false);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <>
      <div className="bg-white rounded shadow p-4 transform transition-transform duration-200 hover:scale-105">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-48 object-cover rounded cursor-pointer"
          onClick={openFullscreen}
        />
        <h3 className="mt-2 font-bold text-lg">{artwork.title}</h3>
        <p className="text-gray-600">{artwork.description}</p>

        <button
          onClick={handleFavoriteClick}
          className={`mt-4 py-1 px-4 rounded text-white ${
            isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <img
            src={artwork.image}
            alt={artwork.title}
            onClick={toggleZoom}
            className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
              isZoomed ? "scale-125" : ""
            }`}
          />
          <button
            onClick={closeFullscreen}
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
