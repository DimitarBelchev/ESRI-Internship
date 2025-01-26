import { geocodeAddress } from "./geocoding";
import { toast } from "react-toastify";

export async function handleClickAddress(address) {
  try {
    const resp = await geocodeAddress(address);
    const { candidates } = resp;

    if (!candidates || candidates.length === 0) {
      toast.error(`Няма намерени резултати за "${address}"`);
      return;
    }

    const { x, y } = candidates[0].location; // x=lng, y=lat

    window.dispatchEvent(
      new CustomEvent("map-navigate", {
        detail: { lat: y, lng: x, address },
      })
    );
  } catch (err) {
    console.error(err);
    toast.error("Грешка при търсене на адрес.");
  }
}
