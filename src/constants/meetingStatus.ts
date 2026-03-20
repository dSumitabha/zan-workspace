export const MEETING_STATUS = {
    SCHEDULED: 1010,
    RESCHEDULED: 1020,
    CANCELLED: 1030,
    MISSED: 1040,
    COMPLETED: 1050,
} as const

export type MeetingStatus = (typeof MEETING_STATUS)[keyof typeof MEETING_STATUS]

export const MEETING_STATUS_META : Record<
    MeetingStatus,
    { label: string; color: string }
> = {
    1010: { label: "Scheduled", color: "blue" },
    1020: { label: "Rescheduled", color: "yellow" },
    1030: { label: "Cancelled", color: "red" },
    1040: { label: "Missed", color: "gray" },
    1050: { label: "Completed", color: "green" },
}