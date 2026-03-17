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
    1: { label: "Active", color: "green" },
    2: { label: "Inactive", color: "gray" },
    3: { label: "On Hold", color: "yellow" },
    4: { label: "Completed", color: "blue" }
}