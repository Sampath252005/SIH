"use client";
import { useState } from "react";
import { getSections } from "@/lib/getSections";
import SectionSelector from "../components/SectionSelector";
import SectionDetails from "../components/SectionDetails";

export default function RailwaySectionView() {
  const sections = getSections();
  const [selectedSection, setSelectedSection] = useState(null);

  const handleConfirm = (section) => {
    setSelectedSection(section); // only set section when check button is clicked
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sidebar: Section Selection */}
      <div className="w-full">
        <SectionSelector
          sections={sections}
          onConfirm={handleConfirm} // only pass onConfirm
        />
      </div>

      {/* Main Content: Section Details */}
      <div>
        <SectionDetails section={selectedSection} />
      </div>
    </div>
  );
}
