import L from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer as ReactLeafletMap,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { toast } from "react-toastify";

import MapCenterer from "./MapCenterer";
import MapClickHandler from "./MapClickHandler";
import MarkerWithPopup from "./MarkerWithPopup";

import { useMapMode } from "../../hooks/useMapMode";
import { copyToClipboard } from "../../utils/clipboard";
import { reverseGeocode } from "../../utils/geocoding";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorageHelper";

// FIX for the default Leaflet marker icon paths when deploying
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url),
});

export default function MapView({ onMapClick }) {
  const [markerData, setMarkerData] = useState(null);
  const [mapMode] = useMapMode();

  const handleMapClickInternal = async (latlng) => {
    try {
      const address = await reverseGeocode(latlng.lat, latlng.lng);
      setMarkerData({ lat: latlng.lat, lng: latlng.lng, address });
    } catch (err) {
      console.error(err);
      toast.error("Грешка при извличане на адреса.");
    }
  };

  useEffect(() => {
    const onMapNavigate = (e) => {
      const { lat, lng, address } = e.detail || {};
      if (lat != null && lng != null) {
        setMarkerData({ lat, lng, address });
      }
    };
    window.addEventListener("map-navigate", onMapNavigate);
    return () => window.removeEventListener("map-navigate", onMapNavigate);
  }, []);

  const tileLayerUrl =
    mapMode === "satellite"
      ? "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const addToFavorites = (addr) => {
    const favorites = getLocalStorageItem("favorites") || [];
    if (favorites.length >= 5) {
      toast.error("Не можеш да добавиш повече от 5 адреса в 'Любими'");
      setMarkerData(null);
      return;
    }
    if (!favorites.includes(addr)) {
      favorites.unshift(addr);
      setLocalStorageItem("favorites", [...new Set(favorites)]);
      toast.success("Добавено в любими!");
    }
    setMarkerData(null);
  };

  const copyAddress = (addr) => {
    copyToClipboard(addr);
    toast.success("Адресът е копиран!");
    setMarkerData(null);
  };

  return (
    <ReactLeafletMap
      center={[42.6977, 23.3219]}
      zoom={10}
      style={{ width: "100%", height: "100%" }}
      zoomControl={false}
    >
      <TileLayer url={tileLayerUrl} />
      <ZoomControl position="bottomright" />

      <MapClickHandler
        onMapClick={handleMapClickInternal}
        onGlobalMapClick={onMapClick}
      />

      <MapCenterer markerData={markerData} />

      <MarkerWithPopup
        markerData={markerData}
        onAddToFavorites={addToFavorites}
        onCopyAddress={copyAddress}
      />
    </ReactLeafletMap>
  );
}
