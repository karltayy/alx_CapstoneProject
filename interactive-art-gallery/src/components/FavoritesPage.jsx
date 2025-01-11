import React from "react";
import useGalleryStore from "./GalleryStore";
import ArtworkCard from "./ArtworkCard";

function FavoritesPage() {
  const favorites = useGalleryStore((state) => state.favorites);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork} />)
        ) : (
          <p className="text-gray-600">No favorites yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
