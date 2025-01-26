import SearchBar from "../SearchBar";
import RecentSearchesList from "../RecentSearchesList";
import FavoritesList from "../FavoritesList";

export default function SidebarContent({ onCloseSidebar }) {
  return (
    <>
      <SearchBar onCloseSidebar={onCloseSidebar} />
      <RecentSearchesList />
      <FavoritesList />
    </>
  );
}
