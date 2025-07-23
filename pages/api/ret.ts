import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const logs = await prisma.logs.findMany({
      include: {
        student: {
          select: {
            studentName: true,
            sitId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      message: 'Logs retrieved successfully',
      logs: logs.map(log => ({
        id: log.id,
        studentName: log.student.studentName,
        sitId: log.student.sitId,
        allotted: log.allotted,
        reason: log.reason,
        createdAt: log.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error retrieving logs:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}