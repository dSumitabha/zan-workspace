export const STATUSES = [
    "NEW LEAD",
    "CONTACTED",
    "MEETING SCHEDULED",
    "DISCUSSION",
    "NEGOTIATION",
    "ACTIVE",
    "IN PROGRESS",
    "MAINTENANCE",
    "COMPLETED"
] as const

export type Status = typeof STATUSES[number]