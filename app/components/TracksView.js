"use client";
import { motion } from "framer-motion";
import { Train, CheckCircle } from "lucide-react";

export default function TracksView({ section }) {
  return (
    <div className="bg-slate-800 p-5 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-white">Tracks</h3>
      <div className="space-y-6">
        {section.tracks.map((track) => (
          <div key={track.track_id}>
            <h4 className="font-semibold mb-3 text-blue-400 flex items-center gap-2">
              <Train className="w-5 h-5" /> Track: {track.track_id}
            </h4>
            <div className="flex space-x-2">
              {track.blocks.map((block, idx) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`flex-1 h-28 flex flex-col justify-between items-center rounded-lg p-2 shadow-md text-white relative overflow-hidden ${
                    block.occupied_by
                      ? "bg-gradient-to-b from-purple-600 to-purple-500"
                      : "bg-gradient-to-b from-green-600 to-green-500"
                  }`}
                  style={{ flex: block.length_km }}
                  title={`${block.id} (${block.length_km} km)`}
                >
                  {/* Occupied / Free */}
                  <div className="flex items-center gap-1 text-sm font-medium z-10 relative">
                    {block.occupied_by ? (
                      <>
                        <Train className="w-4 h-4 text-white" />
                        {block.occupied_by}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-white" />
                        Free
                      </>
                    )}
                  </div>

                  {/* Block ID */}
                  <p className="font-semibold text-sm z-10 relative">
                    {block.id}
                  </p>

                  {/* Length at bottom */}
                  <p className="text-xs text-gray-200 z-10 relative">
                    {block.length_km} km
                  </p>

                  {/* Train Animation for occupied block */}
                  {block.occupied_by && (
                    <motion.div
                      className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-1"
                      initial={{ x: -50 }}
                      animate={{ x: "100%" }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 3 + Math.random() * 2, // randomize speed a bit
                        ease: "linear",
                      }}
                    >
                      <Train className="w-5 h-5 text-yellow-300 animate-pulse" />
                    </motion.div>
                  )}

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 rounded-lg"
                    whileHover={{ opacity: 0.05 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
