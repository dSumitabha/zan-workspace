export default function ContactCardSkeleton() {
    return (
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-neutral-600 animate-pulse">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-300 dark:bg-neutral-700 rounded" />
                    <div className="h-3 w-24 bg-gray-300 dark:bg-neutral-700 rounded" />
                </div>

                <div className="h-5 w-20 bg-gray-300 dark:bg-neutral-700 rounded" />
            </div>

            {/* Service Badge */}
            <div className="flex gap-2 mt-3">
                <div className="h-5 w-28 bg-gray-300 dark:bg-neutral-700 rounded" />
            </div>

            {/* Interaction Card */}
            <div className="mt-3 p-3 rounded-lg bg-gray-200 dark:bg-neutral-800 space-y-2">
                <div className="h-6 w-40 bg-gray-300 dark:bg-neutral-700 rounded" />
                <div className="h-4 w-52 bg-gray-300 dark:bg-neutral-700 rounded" />
                <div className="h-4 w-28 bg-gray-300 dark:bg-neutral-700 rounded" />
            </div>
        </div>
    )
}