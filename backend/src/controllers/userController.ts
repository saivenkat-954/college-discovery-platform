import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../utils/prisma';
import { AppError } from '../middleware/errorMiddleware';

export const saveCollege = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { collegeId } = req.body;
    const userId = req.user?.id;

    if (!userId) return next(new AppError('Unauthorized', 401));

    const saved = await prisma.savedCollege.create({
      data: {
        userId,
        collegeId,
      },
    });

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    next(new AppError('College already saved or invalid ID', 400));
  }
};

export const unsaveCollege = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { collegeId } = req.params;
    const userId = req.user?.id;

    if (!userId) return next(new AppError('Unauthorized', 401));

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId: userId as string,
          collegeId: collegeId as string,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: 'College removed from saved list',
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedColleges = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) return next(new AppError('Unauthorized', 401));

    const saved = await prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: {
          include: {
            courses: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: saved.map((s: any) => s.college),
    });
  } catch (error) {
    next(error);
  }
};
