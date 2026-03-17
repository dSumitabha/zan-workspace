export const LEAD_STATUS = {
    NEW: 10,
    CONTACTED: 20,
    MEETING: 30,
    DISCUSSION: 40,
    NEGOTIATION: 50,
    CONVERTED: 60,
    LOST: 70
} as const

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS]

export const LEAD_STATUS_META: Record<
    LeadStatus, { label: string; color: string }> =
{
    10: { label: "New Lead", color: "gray-500" },
    20: { label: "Contacted", color: "blue-500" },
    30: { label: "Meeting Scheduled", color: "purple-500" },
    40: { label: "Discussion", color: "yellow-500" },
    50: { label: "Negotiation", color: "orange-500" },
    60: { label: "Converted", color: "green-500" },
    70: { label: "Lost", color: "red-500" }
}