import React from "react";
import useGalleryStore from "./GalleryStore";

function ArtworkCard({ artwork }) {
  const { addFavorite, removeFavorite } = useGalleryStore();
  const isFavorite = useGalleryStore((state) =>
    state.favorites.some((fav) => fav.id === artwork.id)
  );

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(artwork.id);
    } else {
      addFavorite(artwork);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <img
        src={artwork.image} // Assuming 'image' is the URL of the artwork
        alt={artwork.title}
        className="w-full h-48 object-cover rounded"
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
  );
}

export default ArtworkCard;
