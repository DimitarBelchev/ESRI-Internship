import clsx from "clsx";

const variants = {
  primary: "bg-primary text-white hover:bg-blue-600",
  secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const sizes = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "rounded focus:outline-none transition-colors inline-flex items-center justify-center",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
