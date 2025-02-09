import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../src/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { HODNAME: username },
    });

    if (!user || user.Password !== password) {
      return res.status(401).json({ message: "Not Verified" });
    }

    return res.status(200).json({ message: "Verified" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
