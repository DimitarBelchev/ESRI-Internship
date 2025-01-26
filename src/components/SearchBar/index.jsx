import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import Button from "../Button";
import SearchInput from "./SearchInput";
import SuggestionsDropdown from "./SuggestionsDropdown";
import useSearchBarLogic from "./useSearchBarLogic";

export default function SearchBar({ onCloseSidebar }) {
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    highlightedIndex,
    inputRef,
    handleSearchSubmit,
    handleClearText,
    handleInputFocus,
    handleInputBlur,
    handleSuggestionClick,
    handleKeyDown,
  } = useSearchBarLogic(onCloseSidebar);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <SearchInput
          ref={inputRef}
          placeholder="Търсене на адрес..."
          value={query}
          onChange={setQuery}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <Button variant="danger" size="sm" onClick={handleClearText}>
            <FaXmark />
          </Button>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            if (
              highlightedIndex >= 0 &&
              highlightedIndex < suggestions.length
            ) {
              handleSuggestionClick(suggestions[highlightedIndex].text);
            } else {
              handleSearchSubmit();
            }
          }}
        >
          <FaSearch />
        </Button>
      </div>

      <SuggestionsDropdown
        show={showSuggestions}
        suggestions={suggestions}
        highlightedIndex={highlightedIndex}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
}
