/**
 * Simple autocomplete component.
 * NOTE: I think this is unused actually
 */
import React, { useState } from "react";
import Fuse from "fuse.js";

interface Props {
  suggestions: Array<string>;
  showSuggestions: boolean;
}

const Autocomplete: React.FC<Props> = ({ suggestions, showSuggestions }) => {
  //   const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const fuse = new Fuse(suggestions);
  const filteredSuggestions = fuse.search(inputValue).map((r) => r.item);
  const isComplete =
    filteredSuggestions.find((s) => s === inputValue) !== undefined;
  const displaySuggestions =
    showSuggestions && filteredSuggestions.length > 0 && !isComplete;

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="text-input"
      />
      {displaySuggestions ? (
        <div className="bg-white rounded-lg border mt-1">
          {filteredSuggestions.map((s) => (
            <div
              key={s}
              className="py-1 pl-2 hover:bg-gray-200 "
              onClick={() => setInputValue(s)}
            >
              {s}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Autocomplete;
