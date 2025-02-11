import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { odCount } = req.query;
    const parsedOdCount = parseInt(odCount as string, 10);

    if (isNaN(parsedOdCount)) {
      return res.status(400).json({ error: "Invalid OD count parameter" });
    }

    console.log("Fetching students with OD count:", parsedOdCount);

    const students = await prisma.students.findMany({
      where: { initialOd: parsedOdCount },
      select: {
        sitId: true,
        studentName: true, // Fixed: Use correct column name
      },
    });

    console.log("Fetched students:", students);

    return res.status(200).json(students.length ? students : []); // Ensure response is always an array
  } catch (error) {
    console.error("Error fetching students:", error);

    return res.status(500).json({
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
