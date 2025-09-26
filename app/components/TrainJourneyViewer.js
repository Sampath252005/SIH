// "use client";
// import React, { useState } from "react";
// import { Train, AlertTriangle, CheckCircle2, Info } from "lucide-react";
// import sectionData from "../data/section.json"; // JSON with multiple sections

// export default function TrainJourneyViewer() {
//   const sectionKeys = Object.keys(sectionData);
//   const [selectedSectionKey, setSelectedSectionKey] = useState(sectionKeys[0]);
//   const currentSection = sectionData[selectedSectionKey];

//   // Example AI recommendations tied to train_id
//   const aiRecommendations = {
//     Train_101: [
//       {
//         id: 1,
//         text: "High priority – keep main line clear.",
//         type: "critical",
//       },
//     ],
//     Train_102: [
//       {
//         id: 2,
//         text: "Slight delay, adjust loop timing by 5 mins.",
//         type: "warning",
//       },
//     ],
//     Train_103: [
//       {
//         id: 3,
//         text: "Freight – reduce speed to balance traffic.",
//         type: "info",
//       },
//       {
//         id: 4,
//         text: "Expected arrival at Station_B with 10 min delay.",
//         type: "success",
//       },
//     ],
//   };

//   const getBadgeColor = (priority) => {
//     switch (priority) {
//       case 1:
//         return "bg-red-500 text-white px-2 py-1 rounded text-xs";
//       case 2:
//         return "bg-yellow-500 text-black px-2 py-1 rounded text-xs";
//       default:
//         return "bg-green-500 text-white px-2 py-1 rounded text-xs";
//     }
//   };

//   const getAiColor = (type) => {
//     switch (type) {
//       case "critical":
//         return "text-red-400";
//       case "warning":
//         return "text-yellow-400";
//       case "info":
//         return "text-blue-400";
//       case "success":
//         return "text-green-400";
//       default:
//         return "text-gray-300";
//     }
//   };

//   const getAiIcon = (type) => {
//     switch (type) {
//       case "critical":
//       case "warning":
//         return <AlertTriangle size={14} />;
//       case "info":
//         return <Info size={14} />;
//       case "success":
//         return <CheckCircle2 size={14} />;
//       default:
//         return <Info size={14} />;
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg flex flex-col">
//       {/* Section Selector */}
//       <div className="mb-6">
//         <label className="block mb-2 font-semibold">Select Section:</label>
//         <select
//           className="w-full p-2 rounded bg-gray-700 text-white"
//           value={selectedSectionKey}
//           onChange={(e) => setSelectedSectionKey(e.target.value)}
//         >
//           {sectionKeys.map((key) => (
//             <option key={key} value={key}>
//               {sectionData[key].start_station} ➝ {sectionData[key].end_station}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Section Info */}
//       <h2 className="text-xl font-bold mb-2">
//         🚉 Section: {currentSection.section_id}
//       </h2>
//       <p className="mb-6">
//         <span className="font-semibold">From:</span>{" "}
//         {currentSection.start_station} ➝{" "}
//         <span className="font-semibold">To:</span> {currentSection.end_station}
//       </p>

//       {/* Tracks */}
//       <div className="space-y-6">
//         {currentSection.tracks.map((track) => (
//           <div key={track.track_id} className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold mb-3">
//               🛤 Track: {track.track_id}
//             </h3>
//             <div className="flex flex-wrap gap-4">
//               {track.blocks.map((block) => (
//                 <div
//                   key={block.id}
//                   className={`flex-1 min-w-[120px] p-3 rounded-lg text-center ${
//                     block.occupied_by ? "bg-purple-600" : "bg-gray-700"
//                   }`}
//                 >
//                   <p className="font-semibold">{block.id}</p>
//                   <p className="text-sm">Length: {block.length_km} km</p>
//                   <p className="text-sm">
//                     {block.occupied_by ? `🚆 ${block.occupied_by}` : "🟢 Empty"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Train Details with Recommendations */}
//       <h3 className="text-lg font-semibold mt-8 mb-4">🚆 Trains in Section</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {currentSection.trains.map((train) => (
//           <div
//             key={train.train_id}
//             className="bg-gray-800 p-4 rounded-lg shadow"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <Train className="text-yellow-400" size={20} />
//                 <span className="font-bold">
//                   {train.type} ({train.train_id})
//                 </span>
//               </div>
//               <span className={getBadgeColor(train.priority)}>
//                 Priority {train.priority}
//               </span>
//             </div>
//             <p>🛤 Track: {train.current_track}</p>
//             <p>📍 Block: {train.current_block}</p>
//             <p>⚡ Speed: {train.speed_kmh} km/h</p>
//             <p>⏱ Delay: {train.delay_min} min</p>
//             <p>🕒 Departure: {train.scheduled_departure}</p>
//             <p>🏁 Arrival: {train.scheduled_arrival}</p>
//             <p>➡️ Next Station: {train.next_station}</p>

//             {/* AI Recommendations for this train */}
//             {aiRecommendations[train.train_id] && (
//               <div className="mt-4 border-t border-gray-700 pt-3">
//                 <h4 className="font-semibold mb-2">🤖 Recommendations</h4>
//                 <ul className="space-y-2 text-sm">
//                   {aiRecommendations[train.train_id].map((rec) => (
//                     <li
//                       key={rec.id}
//                       className={`flex items-center gap-2 ${getAiColor(
//                         rec.type
//                       )}`}
//                     >
//                       {getAiIcon(rec.type)} {rec.text}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
