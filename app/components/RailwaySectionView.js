"use client";
import React, { useState, useEffect } from "react";
import { Train } from "lucide-react";
import sectionData from "../data/section.json"
// Mock train data (you can replace with API later)
// const trains = [
//   {
//     id: "EXP-101",
//     name: "Express 101",
//     stations: [
//       { name: "Alpha Yard", eta: "10:00 AM" },
//       { name: "Bravo Terminal", eta: "10:20 AM" },
//       { name: "Charlie Central", eta: "10:40 AM" },
//       { name: "Delta Junction", eta: "11:10 AM" },
//       { name: "Echo Park", eta: "11:30 AM" },
//     ],
//   },
//   {
//     id: "SFT-202",
//     name: "Superfast 202",
//     stations: [
//       { name: "Station A", eta: "09:15 AM" },
//       { name: "Station B", eta: "09:40 AM" },
//       { name: "Station C", eta: "10:05 AM" },
//       { name: "Station D", eta: "10:30 AM" },
//     ],
//   },
// ];

// export default function TrainJourneyViewer() {
//   const [selectedTrain, setSelectedTrain] = useState(null);
//   const [progress, setProgress] = useState(0); // 0–100
//   const [speed, setSpeed] = useState(0);

//   // Animate only if train selected
//   useEffect(() => {
//     if (!selectedTrain) return;

//     setProgress(0); // reset when new train is picked
//     const interval = setInterval(() => {
//       setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
//       setSpeed(60 + Math.floor(Math.random() * 40)); // random 60–100 km/h
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [selectedTrain]);

//   const handleSelect = (e) => {
//     const trainId = e.target.value;
//     const train = trains.find((t) => t.id === trainId);
//     setSelectedTrain(train || null);
//   };

//   return (
//     <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
//       <h3 className="text-lg font-semibold mb-4 text-white">Train Journey</h3>

//       {/* Train Selector */}
//       <select
//         className="w-full p-2 rounded bg-gray-700 text-white mb-6"
//         onChange={handleSelect}
//         defaultValue=""
//       >
//         <option value="">-- Select Train --</option>
//         {trains.map((t) => (
//           <option key={t.id} value={t.id}>
//             {t.name}
//           </option>
//         ))}
//       </select>

//       {!selectedTrain ? (
//         <p className="text-gray-400">Please select a train to view journey.</p>
//       ) : (
//         <>
//           {/* Progress Line */}
//           <div className="relative h-2 bg-gray-600 mt-10 rounded">
//             {/* Progress bar */}
//             <div
//               className="absolute top-0 left-0 h-2 bg-purple-500 rounded"
//               style={{ width: `${progress}%` }}
//             ></div>

//             {/* Stations */}
//             <div className="absolute -top-10 w-full flex justify-between">
//               {selectedTrain.stations.map((station, i) => (
//                 <div
//                   key={i}
//                   className="flex flex-col items-center text-gray-300"
//                 >
//                   <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white"></div>
//                   <span className="text-xs mt-1 whitespace-nowrap">
//                     {station.name}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Train icon */}
//             <div
//               className="absolute -top-8 transition-all duration-500"
//               style={{ left: `${progress}%` }}
//             >
//               <Train className="text-yellow-400" size={28} />
//             </div>
//           </div>

//           {/* Info Box */}
//           <div className="mt-6 bg-gray-900 p-3 rounded-lg text-gray-200">
//             <p>
//               <span className="font-semibold">🚆 Train:</span>{" "}
//               {selectedTrain.name}
//             </p>
//             <p>
//               <span className="font-semibold">📍 Next Stop:</span>{" "}
//               {
//                 selectedTrain.stations[
//                   Math.min(
//                     Math.floor(
//                       (progress / 100) * selectedTrain.stations.length
//                     ),
//                     selectedTrain.stations.length - 1
//                   )
//                 ].name
//               }
//             </p>
//             <p>
//               <span className="font-semibold">⏱ ETA:</span>{" "}
//               {
//                 selectedTrain.stations[
//                   Math.floor(
//                     (progress / 100) * (selectedTrain.stations.length - 1)
//                   )
//                 ].eta
//               }
//             </p>
//             <p>
//               <span className="font-semibold">⚡ Speed:</span> {speed} km/h
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
export default function TrainJourneyViewer() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      {/* Section Info */}
      <h2 className="text-xl font-bold mb-2">🚉 Section: {sectionData.section_id}</h2>
      <p className="mb-6">
        <span className="font-semibold">From:</span> {sectionData.start_station} ➝{" "}
        <span className="font-semibold">To:</span> {sectionData.end_station}
      </p>

      {/* Tracks & Blocks */}
      <div className="space-y-6">
        {sectionData.tracks.map((track) => (
          <div key={track.track_id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🛤 Track: {track.track_id}</h3>

            <div className="flex space-x-4">
              {track.blocks.map((block) => (
                <div
                  key={block.id}
                  className={`flex-1 p-3 rounded-lg text-center ${
                    block.occupied_by ? "bg-purple-600" : "bg-gray-700"
                  }`}
                >
                  <p className="font-semibold">{block.id}</p>
                  <p className="text-sm">Length: {block.length_km} km</p>
                  <p className="text-sm">
                    {block.occupied_by ? `🚆 ${block.occupied_by}` : "🟢 Empty"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Train Details */}
      <h3 className="text-lg font-semibold mt-8 mb-4">🚆 Trains in Section</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionData.trains.map((train) => (
          <div key={train.train_id} className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Train className="text-yellow-400" size={20} />
              <span className="font-bold">{train.type} ({train.train_id})</span>
            </div>
            <p>🛤 Track: {train.current_track}</p>
            <p>📍 Block: {train.current_block}</p>
            <p>⚡ Speed: {train.speed_kmh} km/h</p>
            <p>🎯 Priority: {train.priority}</p>
            <p>⏱ Delay: {train.delay_min} min</p>
            <p>🕒 Departure: {train.scheduled_departure}</p>
            <p>🏁 Arrival: {train.scheduled_arrival}</p>
            <p>➡️ Next Station: {train.next_station}</p>
          </div>
        ))}
      </div>
    </div>
  );
}