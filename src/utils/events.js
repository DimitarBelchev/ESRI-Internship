export function dispatchMapNavigate(lat, lng, address) {
  window.dispatchEvent(
    new CustomEvent("map-navigate", {
      detail: { lat, lng, address },
    })
  );
}

export function dispatchMapModeUpdated() {
  window.dispatchEvent(new Event("mapModeUpdated"));
}

export function dispatchLocalStorageUpdate() {
  window.dispatchEvent(new Event("localStorageUpdate"));
}
