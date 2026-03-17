import dbConnect from "@/lib/db/dbConnect"
import Client from "@/models/Client"
import Lead from "@/models/Lead"
import Project from "@/models/Project"
import { PROJECT_STATUS } from "@/constants/projectStatus"

const PROJECTS = [
    {
        title: "Raina ERP System",
        leadPhone: "9876543210",
        companyName: "Raina Ventures",
        serviceType: "Web Development",
        description: "ERP system for business operations",
        budget: 120000,
        status: PROJECT_STATUS.IN_PROGRESS
    },
    {
        title: "Patel Infra Marketing",
        leadPhone: "9876543211",
        companyName: "Patel Infra",
        serviceType: "Digital Marketing",
        description: "Lead generation and funnel setup",
        budget: 80000,
        status: PROJECT_STATUS.DISCUSSION
    },
    {
        title: "Jadeja Fitness App",
        leadPhone: "9876543218",
        companyName: "Jadeja Fitness",
        serviceType: "Mobile App",
        description: "Fitness tracking mobile application",
        budget: 150000,
        status: PROJECT_STATUS.DEPLOYED
    }
]

export default async function seedProjects() {
    try {
        await dbConnect()
        console.log("DB Connected (Projects)")

        for (const projectData of PROJECTS) {
            // 1. find lead
            const lead = await Lead.findOne({
                phone: projectData.leadPhone
            })

            if (!lead) {
                console.warn(`Lead not found for ${projectData.title}`)
                continue
            }

            // 2. find client
            const client = await Client.findOne({
                leadId: lead._id
            })

            if (!client) {
                console.warn(`Client not found for lead ${lead.name}`)
                continue
            }

            // 3. prevent duplicate
            const existingProject = await Project.findOne({
                title: projectData.title,
                clientId: client._id
            })

            if (existingProject) {
                console.log(`Project already exists: ${projectData.title}`)
                continue
            }

            // 4. create project
            const project = await Project.create({
                clientId: client._id,
                title: projectData.title,
                companyName: projectData.companyName,
                description: projectData.description,
                serviceType: projectData.serviceType,
                budget: projectData.budget,
                status: projectData.status
            })

            console.log(
                `Project Created: ${project.title} (Client: ${client.name})`
            )
        }
    } catch (err) {
        console.error("Project Seeder Error:", err)
        throw err
    }
}