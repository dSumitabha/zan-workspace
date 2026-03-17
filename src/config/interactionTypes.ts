export const INTERACTION_TYPES = [
    "Meeting",
    "Note",
    "Proposal",
    "Call"
] as const

export type InteractionType = typeof INTERACTION_TYPES[number]