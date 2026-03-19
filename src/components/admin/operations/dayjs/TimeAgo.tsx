"use client"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

interface Props {
    date: string | Date
}

export default function TimeAgo({ date }: Props) {
    const d = dayjs(date)

    const relative = d.fromNow()
    const full = d.format("DD/MM/YYYY hh:mm A")

    return (
        <span title={full} className="text-xs text-neutral-500">
            {relative}
        </span>
    )
}