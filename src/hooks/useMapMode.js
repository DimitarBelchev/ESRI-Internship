import { useEffect, useState } from "react";
import { dispatchMapModeUpdated } from "../utils/events";

export function useMapMode() {
  const [mapMode, setMapMode] = useState(() => {
    return localStorage.getItem("mapMode") || "light";
  });

  useEffect(() => {
    function handleMapModeUpdated() {
      const newMode = localStorage.getItem("mapMode") || "light";
      setMapMode(newMode);
    }
    window.addEventListener("mapModeUpdated", handleMapModeUpdated);
    return () => {
      window.removeEventListener("mapModeUpdated", handleMapModeUpdated);
    };
  }, []);

  function toggleMapMode() {
    const newMode = mapMode === "light" ? "satellite" : "light";
    localStorage.setItem("mapMode", newMode);
    dispatchMapModeUpdated();
  }

  return [mapMode, toggleMapMode];
}
