import { useMapEvent } from "react-leaflet";

export default function MapClickHandler({ onMapClick, onGlobalMapClick }) {
  useMapEvent("click", async (e) => {
    await onMapClick?.(e.latlng);
    onGlobalMapClick?.();
  });

  return null;
}
