import { create } from "zustand";

const useGalleryStore = create((set) => ({
  artworks: [],
  favorites: [],
  addArtwork: (artwork) => set((state) => ({ artworks: [...state.artworks, artwork] })),
  addFavorite: (artwork) => set((state) => ({ favorites: [...state.favorites, artwork] })),
  removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((art) => art.id !== id) })),
}));

export default useGalleryStore;