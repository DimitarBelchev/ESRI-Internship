import { Transition } from "@headlessui/react";
import { MdMenu } from "react-icons/md";
import Button from "../Button";
import SidebarHeader from "./SidebarHeader";
import SidebarActions from "./SidebarActions";
import SidebarContent from "./SidebarContent";

export default function CollapsibleSidebar({ open, onToggle, onCloseSidebar }) {
  return (
    <div className="relative z-10">
      <Transition
        show={open}
        enter="transition duration-300"
        enterFrom="-ml-64"
        enterTo="ml-0"
        leave="transition duration-300"
        leaveFrom="ml-0"
        leaveTo="-ml-64"
        className="absolute top-0 left-0 w-80 h-screen shadow-lg bg-white overflow-y-auto"
      >
        <div className="p-4 flex flex-col gap-4 h-full">
          <SidebarHeader onToggle={onToggle} />
          <SidebarActions />

          <SidebarContent onCloseSidebar={onCloseSidebar} />
        </div>
      </Transition>

      {!open && (
        <Button
          className="absolute top-2 left-2"
          onClick={onToggle}
          variant="secondary"
          size="md"
        >
          <MdMenu size={20} />
        </Button>
      )}
    </div>
  );
}
