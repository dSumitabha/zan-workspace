type InteractionType = "MEETING" | "NOTE" | "DOCUMENT" | "PROPOSAL"

interface Props {
    type: InteractionType
    title: string
    subtitle?: string
    time: string
    user: string
}

export default function InteractionCard({
    type,
    title,
    subtitle,
    time,
    user
}: Props) {
    return (
        <div
            className="mt-3 p-3 rounded-lg bg-neutral-200 dark:bg-neutral-900 border border-neutral-800 pl-4 border-l-4 border-blue-500/40"
            title={`Updated by ${user}`}
        >
            <p className="text-sm font-medium">{title}</p>

            {subtitle && (
                <p className="text-xs text-neutral-400 mt-1">{subtitle}</p>
            )}

            <p className="text-xs text-neutral-500 mt-2">{time}</p>
        </div>
    )
}
