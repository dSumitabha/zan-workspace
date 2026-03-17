export const CLIENT_STATUS = {
    ACTIVE: 1,
    INACTIVE: 2,
    ON_HOLD: 3,
    COMPLETED: 4
} as const

export type ClientStatus =
    (typeof CLIENT_STATUS)[keyof typeof CLIENT_STATUS]

export const CLIENT_STATUS_META: Record<
    ClientStatus,
    { label: string; color: string }
> = {
    1: { label: "Active", color: "bg-green-500 text-white" },
    2: { label: "Inactive", color: "bg-gray-500 text-white" },
    3: { label: "On Hold", color: "bg-yellow-500 text-yellow-900" },
    4: { label: "Completed", color: "bg-blue-500 text-white" }
}
