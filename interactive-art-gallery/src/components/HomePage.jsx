import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Example icons from react-icons
import useGalleryStore from "./GalleryStore";
import ArtworkCard from "./ArtworkCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components for React Slick
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
      onClick={onClick}
    >
      <FaArrowRight size={20} />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
      onClick={onClick}
    >
      <FaArrowLeft size={20} />
    </div>
  );
}

function HomePage() {
  // Fetch all artworks from the store
  const artworks = useGalleryStore((state) => state.artworks);

  // React Slick settings
  const settings = {
    dots: true,            // Show navigation dots
    infinite: true,        // Loop through slides
    speed: 500,            // Transition speed in ms
    slidesToShow: 3,       // Number of slides to show at once (desktop)
    slidesToScroll: 1,     // Slides to scroll at a time
    arrows: true,          // Enable arrows
    nextArrow: <NextArrow />,  // Our custom next arrow
    prevArrow: <PrevArrow />,  // Our custom prev arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides below 1024px
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show 1 slide below 600px
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-10 px-4 text-center">
      <h1 className="text-4xl font-bold">Welcome to the Interactive Art Gallery</h1>
      <p className="text-gray-600 mt-4">Discover, upload, and favorite stunning artworks.</p>

      {artworks.length > 0 ? (
        <Slider {...settings} className="mt-8 relative">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="px-2">
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="mt-8 text-gray-700">
          No artworks found. Encourage users to upload some!
        </p>
      )}
    </div>
  );
}

export default HomePage;
