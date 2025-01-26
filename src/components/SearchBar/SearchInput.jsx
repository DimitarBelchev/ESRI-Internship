import React, { forwardRef } from "react";

const SearchInput = forwardRef(
  ({ value, onChange, onFocus, onBlur, onKeyDown, placeholder }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
