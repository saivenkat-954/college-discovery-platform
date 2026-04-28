import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AppError } from '../middleware/errorMiddleware';

export const getAllColleges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      search, 
      city, 
      state, 
      type, 
      minFees, 
      maxFees, 
      page = 1, 
      limit = 10 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { city: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    if (city) where.city = String(city);
    if (state) where.state = String(state);
    if (type) where.type = String(type);

    if (minFees || maxFees) {
      where.courses = {
        some: {
          fees: {
            gte: minFees ? Number(minFees) : 0,
            lte: maxFees ? Number(maxFees) : 10000000,
          },
        },
      };
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        include: {
          courses: true,
        },
        skip,
        take,
        orderBy: {
          ranking: 'asc',
        },
      }),
      prisma.college.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      count: colleges.length,
      total,
      pages: Math.ceil(total / take),
      data: colleges,
    });
  } catch (error) {
    next(error);
  }
};

export const getCollegeBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const college = await prisma.college.findUnique({
      where: { slug: slug as string },
      include: {
        courses: true,
      },
    });

    if (!college) {
      return next(new AppError('College not found', 404));
    }

    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error) {
    next(error);
  }
};

export const compareColleges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return next(new AppError('Please provide college IDs to compare', 400));
    }

    const idList = String(ids).split(',');
    const colleges = await prisma.college.findMany({
      where: {
        id: { in: idList },
      },
      include: {
        courses: true,
      },
    });

    res.status(200).json({
      success: true,
      data: colleges,
    });
  } catch (error) {
    next(error);
  }
};
