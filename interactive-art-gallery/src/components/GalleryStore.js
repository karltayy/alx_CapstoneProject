import { create } from "zustand";

const useGalleryStore = create((set) => ({
  artworks: JSON.parse(localStorage.getItem("artworks")) || [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  addArtwork: (artwork) =>
    set((state) => {
      const updatedArtworks = [...state.artworks, artwork];
      localStorage.setItem("artworks", JSON.stringify(updatedArtworks));
      return { artworks: updatedArtworks };
    }),
  addFavorite: (artwork) =>
    set((state) => {
      const updatedFavorites = [...state.favorites, artwork];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),
  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((art) => art.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),
}));

export default useGalleryStore;