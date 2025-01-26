import axios from "axios";
import { FIND_URL, REVERSE_GEOCODE_URL } from "../constants/apiUrls";

export async function geocodeAddress(address) {
  const response = await axios.get(FIND_URL, {
    params: { SingleLine: address, f: "json" },
  });
  return response.data;
}

export async function reverseGeocode(lat, lng) {
  const response = await axios.get(REVERSE_GEOCODE_URL, {
    params: {
      location: `${lng},${lat}`,
      f: "json",
    },
  });
  if (response.data && response.data.address) {
    return response.data.address.Match_addr;
  }
  return "Грешен адрес";
}
