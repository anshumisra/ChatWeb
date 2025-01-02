import { useState } from 'react';

function SearchBox({ placeholderText, onInputChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onInputChange(e.target.value); 
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="flex px-12 py-3 rounded-full border-2 border-blue-800 overflow-hidden max-w-md mx-auto font-protest">
        <input
          type="text"
          placeholder={placeholderText}
          value={inputValue}
          onChange={handleInputChange}
          className="w-full outline-none bg-transparent text-gray-600 text-sm"
        />
      </div>
    </div>
  );
}

export default SearchBox;
