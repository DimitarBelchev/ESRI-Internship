import { FaGlobeAmericas, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useMapMode } from "../../hooks/useMapMode";
import Button from "../Button";

export default function SidebarActions() {
  const [mapMode, toggleMapMode] = useMapMode();

  const handleChangeMapMode = () => {
    const newMode = mapMode === "light" ? "satellite" : "light";
    toggleMapMode();
    toast.info(`Превключихте към "${newMode}" режим`);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={handleChangeMapMode} variant="primary" size="sm">
        <FaGlobeAmericas />
      </Button>
      <Button onClick={clearLocalStorage} variant="danger" size="sm">
        <FaTrash />
        сайт дата
      </Button>
    </div>
  );
}
