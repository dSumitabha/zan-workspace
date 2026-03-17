import { ProjectStatus } from "@/constants/projectStatus"

export interface Project {
    _id: string

    clientId: string
    companyName?: string
    title: string
    description?: string
    serviceType?: string

    status: ProjectStatus

    budget?: number

    createdAt: string
    updatedAt: string
}