import "dotenv/config"
import dbConnect from "@/lib/db/dbConnect"

import Client from "@/models/Client"
import Company from "@/models/Company"
import Project from "@/models/Project"
import Interaction from "@/models/Interaction"

import { contacts } from "@/data/data"

async function seedDatabase() {

    try {

        await dbConnect()

        console.log("Connected to MongoDB")

        console.log("Clearing existing data...")

        await Client.deleteMany({})
        await Company.deleteMany({})
        await Project.deleteMany({})
        await Interaction.deleteMany({})

        console.log("Starting seed...")

        for (const contact of contacts) {

            const client = await Client.create({
                name: contact.name
            })

            const company = await Company.create({
                name: contact.company,
                clientId: client._id
            })

            const project = await Project.create({
                companyId: company._id,
                title: `${contact.service} Project`,
                description: `${contact.service} implementation`,
                service: contact.service,
                status: contact.status
            })

            await Interaction.create({
                projectId: project._id,
                type: contact.interaction.type,
                title: contact.interaction.title,
                subtitle: contact.interaction.subtitle,
                time: contact.interaction.time,
                user: contact.interaction.user
            })

        }

        console.log("Database seeded successfully")

        process.exit(0)

    } catch (error) {

        console.error("Seed failed:", error)
        process.exit(1)

    }
}

seedDatabase()