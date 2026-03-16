export default function StatsPanel() {
    const stats = [
        { label: "Leads", value: 18 },
        { label: "Active Clients", value: 7 },
        { label: "Projects Running", value: 5 },
        { label: "Meetings This Week", value: 9 }
    ]

    return (
        <div className="space-y-3">

            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-800"
                >
                    <p className="text-xs text-neutral-400">{stat.label}</p>
                    <p className="text-lg font-semibold text-blue-400">
                        {stat.value}
                    </p>
                </div>
            ))}

        </div>
    )
}
