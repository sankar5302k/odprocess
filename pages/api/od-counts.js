import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
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
      });

      const formattedCounts = odCounts.map((count) => ({
        odCount: count.initialOd,
        studentCount: count._count.sitId,
      }));

      return res.status(200).json(formattedCounts);
    } catch (error) {
      console.error("Error fetching OD counts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
