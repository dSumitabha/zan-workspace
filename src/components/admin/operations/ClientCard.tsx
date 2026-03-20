import StatusBadge from "./StatusBadge"
import InteractionCard from "./InteractionCard"
import ServiceBadge from "./ServiceBadge"
import { CLIENT_STATUS_META, CLIENT_STATUS } from "@/constants/clientStatus"
import TimeAgo from "./dayjs/TimeAgo"
import Link from "next/link"

interface Props {
    id: string
    name: string
    company: string
    email?: string
    phone: string
    createdAt: string

    status: CLIENT_STATUS

    service?: "Web Development" | "Digital Marketing" | "BlockChain" | "Mobile APP" | "SEO"

    interaction?: {
        type: "MEETING" | "NOTE" | "DOCUMENT" | "PROPOSAL"
        title: string
        subtitle?: string
        time: string
        user: string
    }
}

export default function ClientCard({
    id,
    name,
    company,
    email,
    phone,
    createdAt,
    status,
    service,
    interaction
}: Props) {
    return (
        <Link
            href={`/admin/operations/clients/${id}`}
            className="block my-4 p-4 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-neutral-600 hover:border-blue-500/40 transition cursor-pointer"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-neutral-400">{company}</p>
                </div>

                <StatusBadge status={status} meta={CLIENT_STATUS_META} />
            </div>

            {/* Contact Info */}
            <div className="mt-3 text-sm text-neutral-300 space-y-1">
                <p>{phone}</p>
                {email && <p>{email}</p>}

                <p className="text-xs text-neutral-500">
                    <TimeAgo date={createdAt} />
                </p>
            </div>

            {/* Service */}
            <div className="flex gap-2 mt-3">
                {service && <ServiceBadge service={service} />}
            </div>

            {/* Interaction */}
            {interaction && <InteractionCard {...interaction} />}
        </Link>
    )
}