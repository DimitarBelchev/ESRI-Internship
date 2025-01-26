import React from "react";

export default function SuggestionsDropdown({
  show,
  suggestions,
  highlightedIndex,
  onSuggestionClick,
}) {
  if (!show || suggestions.length === 0) return null;

  return (
    <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto z-50">
      {suggestions.map((sugg, index) => (
        <div
          key={index}
          className={`p-2 cursor-pointer hover:bg-gray-100 ${
            index === highlightedIndex ? "bg-gray-200" : ""
          }`}
          onMouseDown={() => onSuggestionClick(sugg.text)}
        >
          {sugg.text}
        </div>
      ))}
    </div>
  );
}
