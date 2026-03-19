interface StatusMeta {
    label: string
    color: string
}

interface Props<T extends number> {
    status: T
    meta: Record<T, StatusMeta>
}

export default function StatusBadge<T extends number>({
    status,
    meta
}: Props<T>) {
    const config = meta[status]

    if (!config) {
        return (
            <span className="text-xs px-2 py-1 rounded-md bg-gray-500 text-white">
                Unknown
            </span>
        )
    }

    return (
        <span
            className={`text-xs px-2 py-1 rounded-md font-medium ${config.color}`}
        >
            {config.label}
        </span>
    )
}