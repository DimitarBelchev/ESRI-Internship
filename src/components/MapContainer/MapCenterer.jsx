import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapCenterer({ markerData }) {
  const map = useMap();

  useEffect(() => {
    if (markerData && markerData.lat != null && markerData.lng != null) {
      map.flyTo([markerData.lat, markerData.lng], 13);
    }
  }, [markerData, map]);

  return null;
}
