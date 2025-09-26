import React from 'react'

const MetricCard = ({title,value,change,negative}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <h4 className="text-gray-400">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${negative ? "text-red-400" : "text-green-400"}`}>
        {change} from last hour
      </p>
    </div>
  )
}

export default MetricCard