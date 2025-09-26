"use client";
import React, { useState, useEffect } from "react";
import { Train } from "lucide-react";

// Mock train data (you can replace with API later)
const trains = [
  {
    id: "EXP-101",
    name: "Express 101",
    stations: [
      { name: "Alpha Yard", eta: "10:00 AM" },
      { name: "Bravo Terminal", eta: "10:20 AM" },
      { name: "Charlie Central", eta: "10:40 AM" },
      { name: "Delta Junction", eta: "11:10 AM" },
      { name: "Echo Park", eta: "11:30 AM" },
    ],
  },
  {
    id: "SFT-202",
    name: "Superfast 202",
    stations: [
      { name: "Station A", eta: "09:15 AM" },
      { name: "Station B", eta: "09:40 AM" },
      { name: "Station C", eta: "10:05 AM" },
      { name: "Station D", eta: "10:30 AM" },
    ],
  },
];

export default function TrainJourneyViewer() {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [progress, setProgress] = useState(0); // 0–100
  const [speed, setSpeed] = useState(0);

  // Animate only if train selected
  useEffect(() => {
    if (!selectedTrain) return;

    setProgress(0); // reset when new train is picked
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
      setSpeed(60 + Math.floor(Math.random() * 40)); // random 60–100 km/h
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTrain]);

  const handleSelect = (e) => {
    const trainId = e.target.value;
    const train = trains.find((t) => t.id === trainId);
    setSelectedTrain(train || null);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-white">Train Journey</h3>

      {/* Train Selector */}
      <select
        className="w-full p-2 rounded bg-gray-700 text-white mb-6"
        onChange={handleSelect}
        defaultValue=""
      >
        <option value="">-- Select Train --</option>
        {trains.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {!selectedTrain ? (
        <p className="text-gray-400">Please select a train to view journey.</p>
      ) : (
        <>
          {/* Progress Line */}
          <div className="relative h-2 bg-gray-600 mt-10 rounded">
            {/* Progress bar */}
            <div
              className="absolute top-0 left-0 h-2 bg-purple-500 rounded"
              style={{ width: `${progress}%` }}
            ></div>

            {/* Stations */}
            <div className="absolute -top-10 w-full flex justify-between">
              {selectedTrain.stations.map((station, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-gray-300"
                >
                  <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white"></div>
                  <span className="text-xs mt-1 whitespace-nowrap">
                    {station.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Train icon */}
            <div
              className="absolute -top-8 transition-all duration-500"
              style={{ left: `${progress}%` }}
            >
              <Train className="text-yellow-400" size={28} />
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-gray-900 p-3 rounded-lg text-gray-200">
            <p>
              <span className="font-semibold">🚆 Train:</span>{" "}
              {selectedTrain.name}
            </p>
            <p>
              <span className="font-semibold">📍 Next Stop:</span>{" "}
              {
                selectedTrain.stations[
                  Math.min(
                    Math.floor(
                      (progress / 100) * selectedTrain.stations.length
                    ),
                    selectedTrain.stations.length - 1
                  )
                ].name
              }
            </p>
            <p>
              <span className="font-semibold">⏱ ETA:</span>{" "}
              {
                selectedTrain.stations[
                  Math.floor(
                    (progress / 100) * (selectedTrain.stations.length - 1)
                  )
                ].eta
              }
            </p>
            <p>
              <span className="font-semibold">⚡ Speed:</span> {speed} km/h
            </p>
          </div>
        </>
      )}
    </div>
  );
}
