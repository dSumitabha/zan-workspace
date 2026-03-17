export const PROJECT_STATUS = {
    DISCUSSION: 110,
    PROPOSAL_SENT: 120,
    NEGOTIATION: 130,
    CONFIRMED: 140,
    IN_PROGRESS: 150,
    DEPLOYED: 160,
    MAINTENANCE: 170,
    CLOSED: 180
} as const

export type ProjectStatus =
    (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS]

export const PROJECT_STATUS_META: Record<
    ProjectStatus,
    { label: string; color: string }
> = {
    110: { label: "Discussion", color: "yellow" },
    120: { label: "Proposal Sent", color: "blue" },
    130: { label: "Negotiation", color: "orange" },
    140: { label: "Confirmed", color: "green" },
    150: { label: "In Progress", color: "purple" },
    160: { label: "Deployed", color: "teal" },
    170: { label: "Maintenance", color: "cyan" },
    180: { label: "Closed", color: "gray" }
}