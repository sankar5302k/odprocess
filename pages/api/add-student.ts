import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, id, odCount, username } = req.body;

  if (!name || !id  || !username) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if student ID already exists
    const existingStudent = await prisma.students.findUnique({
      where: { sitId: id },
    });

    if (existingStudent) {
      return res.status(409).json({ message: "Student ID already exists" });
    }

    // Create new student
    await prisma.students.create({
      data: {
        studentName: name,
        sitId: id,
        initialOd: Number(odCount), // Ensure it's a number
        hodName: username,
      },
    });

    return res.status(200).json({ message: "Student added successfully!" });
  } catch (error) {
    console.error("Error writing to database:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
