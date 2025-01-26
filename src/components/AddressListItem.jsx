import Button from "./Button";

export default function AddressListItem({
  address,
  onClick,
  buttonLabel,
  onButtonClick,
  className = "",
}) {
  return (
    <li
      onClick={onClick}
      className={
        "flex items-start justify-between gap-2 p-3 bg-white " +
        "border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 " +
        "transition cursor-pointer " +
        className
      }
    >
      <p className="flex-1 whitespace-normal break-words text-gray-700 leading-snug">
        {address}
      </p>

      {buttonLabel && onButtonClick && (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick();
          }}
        >
          {buttonLabel}
        </Button>
      )}
    </li>
  );
}
