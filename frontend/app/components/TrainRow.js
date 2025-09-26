import React from 'react'

const TrainRow = ({id,cat,status,delay}) => {
    let color =
    status === "On Time"
      ? "text-purple-400"
      : status === "Delayed"
      ? "text-yellow-400"
      : "text-red-400";
  return (
    <tr className="border-t border-gray-700">
      <td className="p-2">{id}</td>
      <td className="p-2">{cat}</td>
      <td className={`p-2 font-semibold ${color}`}>{status}</td>
      <td className="p-2">{delay}</td>
    </tr>
  )
}

export default TrainRow