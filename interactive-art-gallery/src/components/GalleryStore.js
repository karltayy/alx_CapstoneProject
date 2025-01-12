
import { create } from "zustand";

localStorage.removeItem("favorites");
const useGalleryStore = create((set, get) => ({
  artworks: JSON.parse(localStorage.getItem("artworks")) || [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,

  // Add a new artwork to the global artwork list, including uploader info and timestamp
  addArtwork: (artwork) => {
    const { user } = get();

    // Determine who is uploading the artwork and the time of upload
    const uploaderName = user?.name || "Unknown"; 
    const uploadTime = new Date().toLocaleString();

    // Attach uploader details to the incoming artwork object
    const artworkWithDetails = {
      ...artwork,
      uploadedBy: uploaderName,
      uploadedAt: uploadTime,
    };

    set((state) => {
      const updatedArtworks = [...state.artworks, artworkWithDetails];
      localStorage.setItem("artworks", JSON.stringify(updatedArtworks));
      return { artworks: updatedArtworks };
    });
  },

  // Add an artwork to favorites if not already in favorites
  addFavorite: (artwork) =>
    set((state) => {
      if (!state.favorites.some((fav) => fav.id === artwork.id)) {
        const updatedFavorites = [...state.favorites, artwork];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return { favorites: updatedFavorites };
      }
      return state;
    }),

  // Remove an artwork from favorites by ID
  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((art) => art.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),

  // Register a new user; store user info (including generated profile picture) in localStorage
  registerUser: async (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Fetch a random profile picture (DiceBear in this case)
    const response = await fetch(
      `https://avatars.dicebear.com/api/identicon/${userData.email}.svg`
    );
    const profilePicture = response.url;

    const newUser = { ...userData, profilePicture };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  },

  // Log in user by checking credentials; optionally remember them in localStorage
  loginUser: (email, password, rememberMe) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
      set({ user });
    } else {
      throw new Error("Invalid email or password");
    }
  },

  // Log out the current user
  logoutUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  // Retrieve remembered credentials (if any)
  getRememberedCredentials: () => {
    const rememberMe = localStorage.getItem("rememberMe");
    const email = localStorage.getItem("rememberedEmail") || "";
    const password = localStorage.getItem("rememberedPassword") || "";
    return { rememberMe: !!rememberMe, email, password };
  },

  // Update the logged-in user's profile picture
  updateUserProfilePicture: (profilePicture) =>
    set((state) => {
      const updatedUser = { ...state.user, profilePicture };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),
    
}));

export default useGalleryStore;
