import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find user by hodName
    const user = await prisma.user.findUnique({
      where: { hodName: username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Not Verified" });
    }

    return res.status(200).json({ message: "Verified" });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
