type Status =
    | "NEW_LEAD"
    | "CONTACTED"
    | "MEETING_SCHEDULED"
    | "DISCUSSION"
    | "NEGOTIATION"
    | "ACTIVE"
    | "IN_PROGRESS"
    | "MAINTENANCE"
    | "COMPLETED"

function getColor(status: Status) {
    switch (status) {
        case "NEW_LEAD":
            return "bg-emerald-500/20 text-emerald-400"

        case "CONTACTED":
            return "bg-blue-500/20 text-blue-400"

        case "MEETING_SCHEDULED":
            return "bg-indigo-500/20 text-indigo-400"

        case "DISCUSSION":
            return "bg-sky-500/20 text-sky-400"

        case "NEGOTIATION":
            return "bg-red-500/20 text-red-400"

        case "ACTIVE":
            return "bg-cyan-500/20 text-cyan-400"

        case "IN_PROGRESS":
            return "bg-orange-500/20 text-orange-400"

        case "MAINTENANCE":
            return "bg-purple-500/20 text-purple-400"

        case "COMPLETED":
            return "bg-gray-500/20 text-gray-400"

        default:
            return "bg-gray-500/20 text-gray-400"
    }
}

export default function StatusBadge({ status }: { status: Status }) {
    return (
        <span
            className={`text-xs px-2 py-1 rounded-md font-medium ${getColor(
                status
            )}`}
        >
            {status.replaceAll("_", " ")}
        </span>
    )
}
