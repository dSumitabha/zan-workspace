import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/dbConnect"
import Project from "@/models/Project"

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()

        const { id } = await context.params

        const project = await Project.findById(id)
            .populate("clientId", "name company")

        if (!project) {
            return NextResponse.json(
                { success: false, message: "Project not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: project
        })
    } catch {
        return NextResponse.json(
            { success: false, message: "Invalid ID" },
            { status: 400 }
        )
    }
}

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()

        const { id } = await context.params
        const body = await req.json()

        const project = await Project.findByIdAndUpdate(
            id,
            body,
            { new: true }
        )

        if (!project) {
            return NextResponse.json(
                { success: false, message: "Project not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: project
        })
    } catch {
        return NextResponse.json(
            { success: false, message: "Update failed" },
            { status: 400 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()

        const { id } = await context.params

        const project = await Project.findByIdAndDelete(id)

        if (!project) {
            return NextResponse.json(
                { success: false, message: "Project not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: "Project deleted"
        })
    } catch {
        return NextResponse.json(
            { success: false, message: "Delete failed" },
            { status: 400 }
        )
    }
}