import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AppError } from '../middleware/errorMiddleware';

export const predictColleges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rank, category, state } = req.body;

    if (!rank) {
      return next(new AppError('Please provide your rank', 400));
    }

    // Basic logic: Colleges where the cutoff is greater than or equal to the rank
    // In reality, cutoffs are more complex, but for an MVP, this is the core rule.
    const suggestedColleges = await prisma.college.findMany({
      where: {
        cutoffRank: {
          gte: Number(rank),
        },
      },
      include: {
        courses: true,
      },
      orderBy: {
        cutoffRank: 'asc', // Show colleges closest to their rank first
      },
      take: 20,
    });

    res.status(200).json({
      success: true,
      data: suggestedColleges,
    });
  } catch (error) {
    next(error);
  }
};
