import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { studentId, allotted, reason } = req.body;

    if (!studentId || typeof allotted !== 'boolean') {
      return res.status(400).json({ message: 'Missing required fields: studentId and allotted' });
    }

    const log = await prisma.logs.create({
      data: {
        studentId,
        allotted,
        reason: reason || null,
      },
    });

    return res.status(201).json({ message: 'Log created successfully', log });
  } catch (error) {
    console.error('Error creating log:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}