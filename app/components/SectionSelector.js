"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function SectionSelector({ sections, onConfirm }) {
  const [selected, setSelected] = useState(null); // selected option locally
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (section) => {
    setSelected(section); // only highlight selection
    setShowOptions(false);
    setQuery(section.start_station + " → " + section.end_station);
  };

  const handleConfirm = () => {
    if (!selected) return alert("Please select a section first!");
    onConfirm(selected); // trigger parent only when check is clicked
    setQuery("");
  };

  const filteredSections = sections.filter(
    (sec) =>
      sec.start_station.toLowerCase().includes(query.toLowerCase()) ||
      sec.end_station.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-800">
      <h2 className="text-lg font-bold mb-2 text-blue-900">Select Section</h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        {/* Search Input */}
        <div className="relative w-full sm:w-2/3">
          <input
            type="text"
            value={query}
            placeholder="Search section..."
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowOptions(true)}
            className="w-full px-3 py-2 text-white rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Dropdown */}
          <AnimatePresence>
            {showOptions && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white shadow-md rounded-md border border-blue-200"
              >
                {filteredSections.length > 0 ? (
                  filteredSections.map((sec) => (
                    <li key={sec.section_id}>
                      <button
                        onClick={() => handleSelect(sec)}
                        className={`px-4 py-2 rounded-md w-full text-left transition-colors ${
                          selected?.section_id === sec.section_id
                            ? "bg-blue-800 text-white"
                            : "hover:bg-blue-100 text-blue-900"
                        }`}
                      >
                        {sec.start_station} → {sec.end_station}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No matches found</li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-12 h-12 flex items-center justify-center rounded-full ${
            selected
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 cursor-not-allowed"
          } transition-colors`}
          disabled={!selected}
        >
          <Check className="w-6 h-6 text-white" />
        </motion.button>
      </div>
    </div>
  );
}
