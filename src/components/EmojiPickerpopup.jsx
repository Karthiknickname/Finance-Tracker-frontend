import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef();

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative mb-6">
      {/* Trigger button */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl border rounded-full bg-gray-100">
          {icon ? (
            <img src={icon} alt="Icon" className="w-8 h-8 rounded-full" />
          ) : (
            <LuImage className="text-2xl text-gray-500" />
          )}
        </div>
        <p className="text-sm text-gray-500">{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute z-50 mt-2 md:mt-0 md:top-full left-0 md:left-auto md:right-0 bg-white shadow-lg border rounded-md"
        >
          <div className="flex justify-end p-2">
            <button onClick={() => setIsOpen(false)}>
              <LuX className="text-gray-500 hover:text-black text-xl" />
            </button>
          </div>
          <EmojiPicker
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl || '');
              setIsOpen(false); // auto-close after pick
            }}
            width="300px"
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
