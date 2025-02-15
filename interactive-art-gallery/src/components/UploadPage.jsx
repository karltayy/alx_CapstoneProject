import React, { useState } from "react";
import useGalleryStore from "./GalleryStore";

function UploadPage() {
  const addArtwork = useGalleryStore((state) => state.addArtwork);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  
  // New local state to show a success notification
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArtwork = {
      id: Date.now(),
      title,
      description,
      image,
    };

    // Upload the artwork
    addArtwork(newArtwork);

    // Show success notification
    setShowSuccessMessage(true);

    // Reset the form fields
    setTitle("");
    setDescription("");
    setImage("");

    // Optionally hide the message after a timeout (e.g., 3 seconds)
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Artwork</h1>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-4 p-3 bg-green-500 text-white rounded text-center">
            Artwork uploaded successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
