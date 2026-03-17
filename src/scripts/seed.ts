import "dotenv/config"

import seedLeads from "@/seeder/leadSeeder"

async function runSeed() {
    try {
        console.log("Seeding Started...")

        await seedLeads()

        console.log("Seeding Completed")
        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

runSeed()