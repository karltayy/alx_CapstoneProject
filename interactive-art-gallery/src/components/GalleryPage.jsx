import React from "react";
import useGalleryStore from "./GalleryStore";
import ArtworkCard from "./ArtworkCard";

function GalleryPage() {
  // Fetch the global artworks array directly
  const artworks = useGalleryStore((state) => state.artworks);

  return (
    // Added px-4 for horizontal padding and kept py-10 for vertical spacing
    <div className="container mx-auto py-10 px-4">
      {/* Center the main heading with text-center */}
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>
      {/* The grid has gap-6 for spacing between cards */}
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
