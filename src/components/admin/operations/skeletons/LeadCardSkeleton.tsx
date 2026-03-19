export default function LeadCardSkeleton() {
    return (
        <div className="p-4 rounded-xl border bg-white shadow-sm animate-pulse">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="h-3 w-24 bg-gray-300 rounded" />
                </div>

                <div className="h-5 w-20 bg-gray-300 rounded" />
            </div>

            <div className="mt-3 space-y-2">
                <div className="h-3 w-40 bg-gray-300 rounded" />
                <div className="h-3 w-52 bg-gray-300 rounded" />
            </div>

            <div className="mt-3 h-3 w-28 bg-gray-300 rounded" />
        </div>
    )
}