"use client"

import { useEffect, useState } from "react"
import SearchBar from "@/components/admin/operations/SearchBar"
import StatsPanel from "@/components/admin/operations/StatsPanel"
import { Lead } from "@/types/lead"
import ContactCardSkeleton from "@/components/admin/operations/skeletons/ContactCardSkeleton"
import LeadCard from "@/components/admin/operations/LeadCard"

interface ApiResponse {
    success: boolean
    data: Lead[]
    pagination: {
        page: number
        limit: number
        total: number
        pages: number
    }
}

export default function Page() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    const fetchLeads = async () => {
        try {
            setLoading(true)

            const res = await fetch(
                "/api/admin/operations/leads?page=1&limit=10"
            )

            const json: ApiResponse = await res.json()

            if (json.success) {
                setLeads(json.data)
            }
        } catch (error) {
            console.error("Failed to fetch leads", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeads()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-4">

                    <SearchBar />

                    {/* Loading Skeleton */}
                    {loading && (
                        <div className="space-y-4">
                            {loading &&
                                Array.from({ length: 5 }).map((_, i) => (
                                    <ContactCardSkeleton key={i} />
                                ))}
                        </div>
                    )}

                    {/* Leads List */}
                    {!loading && leads.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No leads found
                        </div>
                    )}

                    {!loading &&
                        leads.map((lead) => (
                            <LeadCard key={lead._id} lead={lead} />
                        ))}
                </div>

                {/* RIGHT SIDE */}
                <StatsPanel />
            </div>
        </div>
    )
}