"use client";
import TracksView from "./TracksView";
import { motion } from "framer-motion";
import { Train, Hash, Clock, MapPin, Zap } from "lucide-react";
import Performence from "./Performence";
import { useState, useEffect } from "react";

export default function SectionDetails({ section }) {
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const [per, setPer] = useState({
    Network_Throughput: {
      value: "0 TU/hr",
      change: "0%",
    },
    Average_Delay: {
      value: "0 min",
      change: "0%",
    },
    Track_Utilization: {
      value: "0%",
      change: "0%",
    },
    Punctuality: {
      value: "0%",
      change: "0%",
    },
  });

  const getRecommendation = async () => {
    try {
      setLoading(true); // ✅ start loading
      console.log("Start.....");
      const response = await fetch("/api/ai/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(section),
      });

      const r = await response.json();
      if (!response.ok) {
        alert(r.message);
      }
      if (response.ok) {
        const data1 = Object.values(r.message.recommendation);
        const data2 = r.message.performance;
        setRec(data1);
        setPer(data2);
        console.log("Done.....");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    if (section) {
      getRecommendation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  if (!section) return <p className="p-4">No section selected.</p>;

  // ✅ Helper function to color-code delays
  const getDelayColor = (delay) => {
    if (delay === 0) return "text-green-400";
    if (delay <= 10) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {section.start_station} → {section.end_station}
      </h2>

      <Performence data={per} />

      {/* Track View */}
      <TracksView section={section} />

      {/* Train Details + AI Recommendations */}
      <h3 className="text-lg font-semibold mt-6 p-3">Trains</h3>
      <div className="flex flex-col lg:flex-row w-full gap-5">
        {/* Train List */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {section.trains.map((train, idx) => (
            <motion.div
              key={train.train_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="border p-6 rounded-xl bg-gray-800 shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="font-bold text-lg flex items-center gap-2 mb-2">
                <Train className="w-5 h-5 text-blue-400" />
                {train.train_id} ({train.type})
              </p>

              <p className="flex items-center gap-2 mb-1 text-gray-300">
                <Hash className="w-4 h-4" /> Priority {train.priority}
              </p>
              <p className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-green-400" /> Track:{" "}
                {train.current_track}
              </p>
              <p className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-yellow-400" /> Block:{" "}
                {train.current_block}
              </p>
              <p className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-red-400" /> Speed:{" "}
                {train.speed_kmh} km/h
              </p>
              <p
                className={`flex items-center gap-2 mb-1 ${getDelayColor(
                  train.delay_min
                )}`}
              >
                <Clock className="w-4 h-4" /> Delay: {train.delay_min} min
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" /> Next Station:{" "}
                {train.next_station}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="bg-gray-800 rounded-xl p-4 w-full lg:w-1/2">
          <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
          {loading ? ( // ✅ show loading when fetching
            <p className="text-yellow-400">Loading recommendations...</p>
          ) : (
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {rec.map((val, ind) => (
                <li key={ind} className="text-green-400">
                  {val}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
