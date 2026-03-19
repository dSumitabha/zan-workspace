"use client"

import ContactCard from "./ContactCard"
import { Lead } from "@/types/lead"
import { LEAD_STATUS_META } from "@/constants/leadStatus"

interface Props {
    lead: Lead
}

export default function LeadCard({ lead }: Props) {
    const meta = LEAD_STATUS_META[lead.status]

    return (
        <ContactCard
            name={lead.name}
            company={lead.source}
            service="Web Development" // can be dynamic later
            status={meta.label
                .toUpperCase()
                .replace(/ /g, "_") as any}
            interaction={{
                type: "NOTE",
                title: "Lead Created",
                subtitle: lead.source,
                time: new Date(lead.createdAt).toLocaleDateString(),
                user: "System"
            }}
        />
    )
}