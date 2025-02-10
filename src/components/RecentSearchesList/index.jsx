import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";

import { useFavorites } from "../../hooks/useFavorites";
import AddressListItem from "../AddressListItem";
import Button from "../Button";

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorageHelper";
import { handleClickAddress } from "../../utils/mapNavigation";

export default function RecentSearchesList() {
  const [recents, setRecents] = useState([]);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    setRecents(getLocalStorageItem("recents"));
    function handleStorageUpdate() {
      setRecents(getLocalStorageItem("recents"));
    }
    window.addEventListener("localStorageUpdate", handleStorageUpdate);
    return () => {
      window.removeEventListener("localStorageUpdate", handleStorageUpdate);
    };
  }, []);

  const handleClearRecents = () => {
    setLocalStorageItem("recents", []);
  };

  const handleToggleFavorite = (address) => {
    if (isFavorite(address)) {
      removeFavorite(address);
    } else {
      addFavorite(address);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm">Последни търсения</h3>
        {recents.length > 0 && (
          <Button variant="danger" size="xs" onClick={handleClearRecents}>
            <FaTrash />
          </Button>
        )}
      </div>
      {recents.length === 0 ? (
        <p className="text-gray-500 text-sm">Нямате последни търсения.</p>
      ) : (
        <ul className="space-y-2">
          {recents.map((item, idx) => {
            const favoriteStatus = isFavorite(item);
            return (
              <AddressListItem
                key={idx}
                address={item}
                onClick={() => handleClickAddress(item)}
                buttonLabel={favoriteStatus ? <FaHeart /> : <FaRegHeart />}
                onButtonClick={() => handleToggleFavorite(item)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
