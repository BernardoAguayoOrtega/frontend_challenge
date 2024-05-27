'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Movie } from '../types/movie';
import { useSession } from 'next-auth/react';
import { openDB } from 'idb';

interface FavoritesContextProps {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (session) {
        const db = await openDB('favoritesDB', 1, {
          upgrade(db) {
            db.createObjectStore('favorites', { keyPath: 'id' });
          },
        });
        const tx = db.transaction('favorites', 'readonly');
        const store = tx.objectStore('favorites');
        const allFavorites = await store.getAll();
        const sessionFavorites = allFavorites.filter(
          (fav: any) => fav.userId === session.user.email
        );
        setFavorites(sessionFavorites);
      }
    };

    fetchFavorites();
  }, [session]);

  const saveFavorites = async (updatedFavorites: Movie[]) => {
    if (session) {
      const db = await openDB('favoritesDB', 1, {
        upgrade(db) {
          db.createObjectStore('favorites', { keyPath: 'id' });
        },
      });
      const tx = db.transaction('favorites', 'readwrite');
      const store = tx.objectStore('favorites');
      const sessionFavorites = updatedFavorites.map((favorite) => ({
        ...favorite,
        userId: session.user.email,
      }));
      await Promise.all(
        sessionFavorites.map((favorite) => store.put(favorite))
      );
    }
  };

  const addFavorite = (movie: Movie) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, movie];
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (movie) => movie.id !== movieId
      );
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
