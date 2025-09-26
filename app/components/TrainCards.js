// "use client";
// import { motion } from "framer-motion";
// import { Train, AlertTriangle, CheckCircle2, Info } from "lucide-react";

// export default function TrainCards({ currentSection }) {
//   const aiRecommendations = {
//     Train_101: [
//       { id: 1, text: "High priority – keep main line clear.", type: "critical" },
//     ],
//     Train_102: [
//       { id: 2, text: "Slight delay, adjust loop timing by 5 mins.", type: "warning" },
//     ],
//     Train_103: [
//       { id: 3, text: "Freight – reduce speed to balance traffic.", type: "info" },
//       { id: 4, text: "Expected arrival at Station_B with 10 min delay.", type: "success" },
//     ],
//   };

//   const getBadgeColor = (priority) => {
//     switch (priority) {
//       case 1: return "bg-red-500 text-white px-2 py-1 rounded text-xs";
//       case 2: return "bg-yellow-500 text-black px-2 py-1 rounded text-xs";
//       default: return "bg-green-500 text-white px-2 py-1 rounded text-xs";
//     }
//   };

//   const getAiColor = (type) => {
//     switch (type) {
//       case "critical": return "text-red-400";
//       case "warning": return "text-yellow-400";
//       case "info": return "text-blue-400";
//       case "success": return "text-green-400";
//       default: return "text-gray-300";
//     }
//   };

//   const getAiIcon = (type) => {
//     switch (type) {
//       case "critical":
//       case "warning": return <AlertTriangle size={14} />;
//       case "info": return <Info size={14} />;
//       case "success": return <CheckCircle2 size={14} />;
//       default: return <Info size={14} />;
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {currentSection.trains.map((train) => (
//         <motion.div
//           key={train.train_id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-gray-800 p-4 rounded-lg shadow"
//         >
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center gap-2">
//               <Train className="text-yellow-400" size={20} />
//               <span className="font-bold">{train.type} ({train.train_id})</span>
//             </div>
//             <span className={getBadgeColor(train.priority)}>Priority {train.priority}</span>
//           </div>

//           <p>🛤 Track: {train.current_track}</p>
//           <p>📍 Block: {train.current_block}</p>
//           <p>⚡ Speed: {train.speed_kmh} km/h</p>
//           <p>⏱ Delay: {train.delay_min} min</p>
//           <p>🕒 Departure: {train.scheduled_departure}</p>
//           <p>🏁 Arrival: {train.scheduled_arrival}</p>
//           <p>➡️ Next Station: {train.next_station}</p>

//           {aiRecommendations[train.train_id] && (
//             <div className="mt-4 border-t border-gray-700 pt-3">
//               <h4 className="font-semibold mb-2">🤖 Recommendations</h4>
//               <ul className="space-y-2 text-sm">
//                 {aiRecommendations[train.train_id].map((rec) => (
//                   <li key={rec.id} className={`flex items-center gap-2 ${getAiColor(rec.type)}`}>
//                     {getAiIcon(rec.type)} {rec.text}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </motion.div>
//       ))}
//     </div>
//   );
// }
