import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" }) // Handle non-GET requests
  }

  try {
    console.log("Fetching OD counts...")

    const odCounts = await prisma.students.groupBy({
      by: ["initialOd"],
      _count: {
        sitId: true,
      },
      where: {
        initialOd: {
          lte: 5,
        },
      },
      orderBy: {
        initialOd: "asc",
      },
    })

    console.log("Fetched OD counts:", odCounts)

    const formattedCounts = odCounts.map((count) => ({
      odCount: count.initialOd,
      studentCount: count._count.sitId,
    }))

    console.log("Formatted OD counts:", formattedCounts)

    res.status(200).json(formattedCounts)
  } catch (error) {
    console.error("Error fetching OD counts:", error.message, error.stack)
    res.status(500).json({ error: "Internal server error", details: error.message })
  }
}
