import MetricCard from "./MetricCard"

export default function Performence({ data }) {

    return (
        <>
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    title="Network Throughput"
                    value={data.Network_Throughput.value}
                    change={data.Network_Throughput.change}
                />
                <MetricCard
                    title="Average Delay"
                    value={data.Average_Delay.value}
                    change={data.Average_Delay.change}
                    negative
                />
                <MetricCard
                    title="Track Utilization"
                    value={data.Track_Utilization.value}
                    change={data.Track_Utilization.change}
                />
                <MetricCard
                    title="Punctuality"
                    value={data.Punctuality.value}
                    change={data.Punctuality.change}
                />
            </div>
        </>
    )
}