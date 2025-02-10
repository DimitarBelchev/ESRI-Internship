import { useCallback, useState } from "react";
import CollapsibleSidebar from "../components/CollapsibleSidebar";
import MapView from "../components/MapContainer";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");

  const closeSidebarOnSmallScreen = useCallback(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapView onMapClick={closeSidebarOnSmallScreen} />
      </div>

      <CollapsibleSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onCloseSidebar={closeSidebarOnSmallScreen}
      />
    </div>
  );
}
