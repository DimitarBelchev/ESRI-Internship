import FavoritesList from "../FavoritesList";
import RecentSearchesList from "../RecentSearchesList";
import SearchBar from "../SearchBar";

export default function SidebarContent({ onCloseSidebar }) {
  return (
    <>
      <SearchBar onCloseSidebar={onCloseSidebar} />
      <RecentSearchesList />
      <FavoritesList />
    </>
  );
}
