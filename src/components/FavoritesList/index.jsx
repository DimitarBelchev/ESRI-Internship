import { useFavorites } from "../../hooks/useFavorites";
import { handleClickAddress } from "../../utils/mapNavigation";
import AddressListItem from "../AddressListItem";
import Button from "../Button";
import { FaTrash, FaHeart } from "react-icons/fa";

export default function FavoritesList() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  return (
    <div>
      <div className="flex justify-between items-center mb-2 mt-4">
        <h3 className="font-semibold text-sm">Любими</h3>
        {favorites.length > 0 && (
          <Button variant="danger" size="xs" onClick={clearFavorites}>
            <FaTrash />
          </Button>
        )}
      </div>
      {favorites.length === 0 ? (
        <p className="text-gray-500 text-sm">Нямате добавени любими адреси.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((fav, idx) => (
            <AddressListItem
              key={idx}
              address={fav}
              onClick={() => handleClickAddress(fav)}
              buttonLabel={<FaHeart />}
              onButtonClick={() => removeFavorite(fav)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
