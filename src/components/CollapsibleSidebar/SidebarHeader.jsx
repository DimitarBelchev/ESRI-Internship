import { FaX } from "react-icons/fa6";
import Button from "../Button";

export default function SidebarHeader({ onToggle }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-xl">Tърсачка на адреси</h2>
      <Button onClick={onToggle} variant="secondary" size="md">
        <FaX />
      </Button>
    </div>
  );
}
