import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorageHelper";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() =>
    getLocalStorageItem("favorites")
  );

  useEffect(() => {
    function handleStorageUpdate() {
      setFavorites(getLocalStorageItem("favorites"));
    }
    window.addEventListener("localStorageUpdate", handleStorageUpdate);
    return () => {
      window.removeEventListener("localStorageUpdate", handleStorageUpdate);
    };
  }, []);

  function addFavorite(address) {
    if (favorites.length >= 5) {
      toast.error("Не можеш да добавиш повече от 5 адреса в 'Любими'");
      return;
    }
    if (!favorites.includes(address)) {
      const updated = [address, ...favorites];
      setLocalStorageItem("favorites", updated);
      toast.success("Добавено в любими!");
    }
  }

  function removeFavorite(address) {
    const updated = favorites.filter((fav) => fav !== address);
    setLocalStorageItem("favorites", updated);
    toast.info("Премахнато от любими!");
  }

  function clearFavorites() {
    setLocalStorageItem("favorites", []);
    toast.info("Всички любими са изчистени!");
  }

  function isFavorite(address) {
    return favorites.includes(address);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
  };
}
