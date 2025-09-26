import Image from "next/image";
import MetricCard from "./components/MetricCard";
import TrainRow from "./components/TrainRow";
// import TrainJourneyViewer from "./components/RailwaySectionView";
import RailwaySectionView from "./components/RailwaySectionView";
export default function DashBoard() {
  return (
    <>
      <div className="space-y-6 flex flex-col">
        {/* Header */}
        <h2 className="text-3xl font-bold ml-10">Dashboard</h2>
        <p className="text-gray-400">
          Real-time overview of the railway network.
        </p>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Network Throughput"
            value="1,205 TU/hr"
            change="+5.2%"
          />
          <MetricCard
            title="Average Delay"
            value="6.8 min"
            change="-12.5%"
            negative
          />
          <MetricCard title="Track Utilization" value="85%" change="+2.1%" />
          <MetricCard title="Punctuality" value="92.3%" change="+1.8%" />
        </div>

        {/* Middle Section */}
        <div className="flex   gap-4">
          {/* Railway Section View */}
          {/* <TrainJourneyViewer/> */}
          <RailwaySectionView/>
        

          {/* AI Recommendations */}
          {/* <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li className="text-red-400">
                Re-route FRT-745 via Loop Line B…
              </li>
              <li className="text-yellow-400">
                Hold EXP-002 at Charlie Central…
              </li>
              <li className="text-green-400">Reduce speed for EXP-001…</li>
              <li className="text-green-400">Advise crew of FRT-745…</li>
            </ul>
          </div> */}
        </div>

        {/* Train Status */}
        <div className="bg-gray-800 rounded-xl p-4 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-3">Train Status</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="p-2">Train ID</th>
                <th className="p-2">Category</th>
                <th className="p-2">Status</th>
                <th className="p-2">Delay (min)</th>
              </tr>
            </thead>
            <tbody>
              <TrainRow id="EXP-001" cat="Express" status="On Time" delay="0" />
              <TrainRow
                id="FRT-745"
                cat="Freight"
                status="Delayed"
                delay="15"
              />
              <TrainRow id="LCL-102" cat="Local" status="On Time" delay="0" />
              <TrainRow
                id="EXP-002"
                cat="Express"
                status="Stopped"
                delay="45"
              />
              <TrainRow id="FRT-301" cat="Freight" status="Delayed" delay="5" />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
