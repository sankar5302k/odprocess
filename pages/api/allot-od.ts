import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { sitId } = req.body;

    if (!sitId) {
      return res.status(400).json({ error: "Student ID is required" });
    }

    const updatedStudent = await prisma.students.update({
      where: { sitId },
      data: { initialOd: { increment: 1 } },
    });

    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error allotting OD:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
