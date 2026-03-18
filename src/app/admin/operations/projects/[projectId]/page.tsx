import { PROJECT_STATUS_META } from "@/constants/projectStatus"

interface Props {
    params: {
        projectId: string
    }
}

async function getProject(projectId: string) {
    const res = await fetch(
        `/api/admin/projects/${projectId}`,
        { cache: "no-store" }
    )

    if (!res.ok) return null

    const data = await res.json()
    return data.data
}

export default async function ProjectDetailsPage({ params }: Props) {
    const project = await getProject(params.projectId)

    if (!project) {
        return (
            <div className="p-6">
                <p className="text-red-500">Project not found</p>
            </div>
        )
    }

    const statusMeta =
        PROJECT_STATUS_META[project.status as keyof typeof PROJECT_STATUS_META]

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-neutral-800">
                            {project.title}
                        </h1>
                        <p className="text-sm text-neutral-500 mt-1">
                            {project.companyName || "No company name"}
                        </p>
                    </div>

                    <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${statusMeta?.color}`}
                    >
                        {statusMeta?.label}
                    </span>
                </div>
            </div>

            {/* Client Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Client Information
                </h2>

                <div className="space-y-2 text-sm text-neutral-700">
                    <p>
                        <span className="text-neutral-500">Name: </span>
                        {project.clientId?.name || "N/A"}
                    </p>
                    <p>
                        <span className="text-neutral-500">Company: </span>
                        {project.clientId?.company || "N/A"}
                    </p>
                </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Project Details
                </h2>

                <div className="space-y-3 text-sm text-neutral-700">
                    <p>
                        <span className="text-neutral-500">Service: </span>
                        {project.serviceType || "N/A"}
                    </p>

                    <p>
                        <span className="text-neutral-500">Description: </span>
                        {project.description || "No description provided"}
                    </p>
                </div>
            </div>

            {/* Budget */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Budget</h2>

                <p className="text-xl font-semibold text-neutral-800">
                    ₹ {project.budget?.toLocaleString() || "0"}
                </p>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Metadata</h2>

                <div className="text-sm text-neutral-600 space-y-2">
                    <p>
                        Created At:{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        Last Updated:{" "}
                        {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Timeline (Future Ready) */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Activity Timeline
                </h2>

                <p className="text-sm text-neutral-500">
                    Timeline data will appear here (meetings, updates, logs)
                </p>
            </div>
        </div>
    )
}