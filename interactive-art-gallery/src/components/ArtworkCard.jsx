import React from "react";
import useGalleryStore from "./GalleryStore";

function ArtworkCard({ artwork }) {
  const addFavorite = useGalleryStore((state) => state.addFavorite);

  return (
    <div className="bg-white rounded shadow p-4">
      <img src={artwork.image} alt={artwork.title} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 font-bold text-lg">{artwork.title}</h3>
      <p className="text-gray-600">{artwork.description}</p>
      <button
        onClick={() => addFavorite(artwork)}
        className="mt-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
      >
        Add to Favorites
      </button>
    </div>
  );
}

export default ArtworkCard;
