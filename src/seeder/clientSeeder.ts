import dbConnect from "@/lib/db/dbConnect"
import Client from "@/models/Client"
import Lead from "@/models/Lead"
import { CLIENT_STATUS } from "@/constants/clientStatus"
import { LEAD_STATUS } from "@/constants/leadStatus"

const CLIENTS = [
    {
        name: "Suresh Raina",
        company: "Raina Ventures",
        email: "suresh@raina.com",
        phone: "9876543210",
        status: CLIENT_STATUS.ACTIVE
    },
    {
        name: "Munaf Patel",
        company: "Patel Infra",
        email: "munaf@patelinfra.com",
        phone: "9876543211",
        status: CLIENT_STATUS.ACTIVE
    },
    {
        name: "Cheteshwar Pujara",
        company: "Jadeja Fitness",
        phone: "9876543218",
        status: CLIENT_STATUS.ACTIVE
    }
]

export default async function seedClients() {
    try {
        await dbConnect()
        console.log("DB Connected (Clients)")

        for (const clientData of CLIENTS) {
            // 1. find corresponding lead using phone
            const lead = await Lead.findOne({ phone: clientData.phone })

            if (!lead) {
                console.warn(`Lead not found for phone ${clientData.phone}`)
                continue
            }

            // 2. prevent duplicate client (based on phone)
            const existingClient = await Client.findOne({
                phone: clientData.phone
            })

            if (existingClient) {
                console.log(
                    `Client already exists for ${clientData.phone}`
                )
                continue
            }

            // 3. create client
            const client = await Client.create({
                name: clientData.name,
                company: clientData.company,
                email: clientData.email,
                phone: clientData.phone,
                status: clientData.status
            })

            // 4. update lead status → converted
            lead.status = LEAD_STATUS.CONVERTED
            await lead.save()

            console.log(
                `Client Created: ${client.company} (Lead: ${lead.name})`
            )
        }
    } catch (err) {
        console.error("Client Seeder Error:", err)
        throw err
    }
}