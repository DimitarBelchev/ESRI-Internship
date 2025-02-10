import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FIND_URL, SUGGEST_URL } from "../../constants/apiUrls";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorageHelper";

export default function useSearchBarLogic(onCloseSidebar) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }
    debouncedFetchSuggestions(query);
    return () => debouncedFetchSuggestions.cancel();
  }, [query]);

  async function fetchSuggestions(val) {
    if (!val) return;
    try {
      const resp = await axios.get(SUGGEST_URL, {
        params: { f: "json", text: val },
      });
      if (resp.data.suggestions) {
        const newSuggestions = resp.data.suggestions.slice(0, 5);
        setSuggestions(newSuggestions);

        if (newSuggestions.length > 0) {
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex(-1);
        }
      }
    } catch (err) {
      console.error("Suggestion Error:", err);
    }
  }

  async function handleSearchSubmit(givenText) {
    const textToSearch = givenText || query;
    if (!textToSearch) {
      return;
    }

    try {
      const response = await axios.get(FIND_URL, {
        params: { SingleLine: textToSearch, f: "json" },
      });
      const { candidates } = response.data;

      if (!candidates || candidates.length === 0) {
        toast.error("Няма намерени резултати");
        setQuery("");
      } else {
        const topCandidate = candidates[0];
        const { x, y } = topCandidate.location; // x=lng, y=lat

        window.dispatchEvent(
          new CustomEvent("map-navigate", {
            detail: { lat: y, lng: x, address: textToSearch },
          })
        );

        let recents = getLocalStorageItem("recents");
        recents.unshift(textToSearch);
        recents = [...new Set(recents)].slice(0, 5);
        setLocalStorageItem("recents", recents);
      }
    } catch (err) {
      console.error(err);
      toast.error("Грешка при търсене на адрес.");
    }

    setQuery("");
    setSuggestions([]);
    setHighlightedIndex(-1);

    onCloseSidebar?.();
  }

  function handleClearText() {
    setQuery("");
    setSuggestions([]);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }

  function handleInputFocus() {
    setShowSuggestions(true);
    if (!query) {
      const recents = getLocalStorageItem("recents");
      if (recents.length) {
        setSuggestions(recents.map((r) => ({ text: r })).slice(0, 5));
      }
    }
  }

  function handleInputBlur() {
    setTimeout(() => setShowSuggestions(false), 200);
  }

  function handleSuggestionClick(suggText) {
    setQuery(suggText);
    handleSearchSubmit(suggText);
  }

  function handleKeyDown(e) {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev + 1 < suggestions.length ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[highlightedIndex].text);
        } else {
          handleSearchSubmit();
        }
        break;
      default:
        break;
    }
  }

  return {
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
  };
}
