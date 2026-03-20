import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import dbConnect from "@/lib/db/dbConnect"

import Lead from "@/models/Lead"
import Client from "@/models/Client"

import { LEAD_STATUS } from "@/constants/leadStatus"
import { CLIENT_STATUS } from "@/constants/clientStatus"

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await mongoose.startSession()

    try {
        await dbConnect()

        const { id } = await context.params
        const body = await req.json()

        if (!body.company) {
            return NextResponse.json(
                { success: false, message: "Company is required" },
                { status: 400 }
            )
        }

        session.startTransaction()

        const lead = await Lead.findById(id).session(session)

        if (!lead) {
            await session.abortTransaction()
            return NextResponse.json(
                { success: false, message: "Lead not found" },
                { status: 404 }
            )
        }

        // Already converted
        if (lead.convertedClientId) {
            await session.abortTransaction()
            return NextResponse.json(
                { success: false, message: "Lead already converted" },
                { status: 400 }
            )
        }

        // Status validation (int-based)
        if (lead.status < 50 || lead.status > 59) {
            await session.abortTransaction()
            return NextResponse.json(
                { success: false, message: "Lead not eligible for conversion" },
                { status: 400 }
            )
        }

        // Prevent duplicate client
        const existingClient = await Client.findOne({
            phone: lead.phone
        }).session(session)

        if (existingClient) {
            await session.abortTransaction()
            return NextResponse.json(
                { success: false, message: "Client already exists with this phone" },
                { status: 409 }
            )
        }

        // Create client (controlled data)
        const client = await Client.create(
            [
                {
                    name: lead.name,
                    company: body.company,
                    phone: lead.phone,
                    email: lead.email,
                    status: CLIENT_STATUS.ACTIVE
                }
            ],
            { session }
        )

        const createdClient = client[0]

        // Update lead
        lead.status = LEAD_STATUS.CONVERTED
        lead.convertedClientId = createdClient._id
        await lead.save({ session })

        await session.commitTransaction()

        return NextResponse.json(
            {
                success: true,
                data: {
                    clientId: createdClient._id
                }
            },
            { status: 201 }
        )
    } catch (error) {
        await session.abortTransaction()

        return NextResponse.json(
            { success: false, message: "Conversion failed" },
            { status: 500 }
        )
    } finally {
        session.endSession()
    }
}