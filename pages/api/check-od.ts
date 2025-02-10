import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { sitId } = req.query;

  if (!sitId || typeof sitId !== "string") {
    return res.status(400).json({ error: "Student ID is required" });
  }

  try {
    const student = await prisma.students.findUnique({
      where: { sitId },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error("Error checking OD status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
