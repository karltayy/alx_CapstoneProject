import React from "react";
import useGalleryStore from "./GalleryStore";
import ArtworkCard from "./ArtworkCard";

function GalleryPage() {
  // Fetch the global artworks array directly
  const artworks = useGalleryStore((state) => state.artworks);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))
        ) : (
          <p className="text-gray-700">No artworks found in the gallery.</p>
        )}
      </div>
    </div>
  );
}

export default GalleryPage;
