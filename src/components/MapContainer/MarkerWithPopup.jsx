import { FaCopy, FaRegHeart } from "react-icons/fa";
import { Marker, Popup } from "react-leaflet";
import { getLocalStorageItem } from "../../utils/localStorageHelper";
import Button from "../Button";

export default function MarkerWithPopup({
  markerData,
  onAddToFavorites,
  onCopyAddress,
}) {
  if (!markerData || markerData.lat == null || markerData.lng == null)
    return null;

  const { lat, lng, address } = markerData;
  const favorites = getLocalStorageItem("favorites");
  const isAlreadyFavorite = favorites.includes(address);
  return (
    <Marker position={[lat, lng]}>
      <Popup autoPan>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center space-x-2"
        >
          <p className="font-semibold">{address}</p>

          <Button
            variant="secondary"
            size="xs"
            onClick={() => onCopyAddress(address)}
          >
            <FaCopy />
          </Button>
          {!isAlreadyFavorite && (
            <Button
              variant="secondary"
              size="xs"
              onClick={() => onAddToFavorites(address)}
            >
              <FaRegHeart />
            </Button>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
