"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareColleges = exports.getCollegeBySlug = exports.getAllColleges = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const getAllColleges = async (req, res, next) => {
    try {
        const { search, city, state, type, minFees, maxFees, page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: String(search), mode: 'insensitive' } },
                { city: { contains: String(search), mode: 'insensitive' } },
            ];
        }
        if (city)
            where.city = String(city);
        if (state)
            where.state = String(state);
        if (type)
            where.type = String(type);
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
            prisma_1.default.college.findMany({
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
            prisma_1.default.college.count({ where }),
        ]);
        res.status(200).json({
            success: true,
            count: colleges.length,
            total,
            pages: Math.ceil(total / take),
            data: colleges,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllColleges = getAllColleges;
const getCollegeBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const college = await prisma_1.default.college.findUnique({
            where: { slug: slug },
            include: {
                courses: true,
            },
        });
        if (!college) {
            return next(new errorMiddleware_1.AppError('College not found', 404));
        }
        res.status(200).json({
            success: true,
            data: college,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCollegeBySlug = getCollegeBySlug;
const compareColleges = async (req, res, next) => {
    try {
        const { ids } = req.query;
        if (!ids) {
            return next(new errorMiddleware_1.AppError('Please provide college IDs to compare', 400));
        }
        const idList = String(ids).split(',');
        const colleges = await prisma_1.default.college.findMany({
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
    }
    catch (error) {
        next(error);
    }
};
exports.compareColleges = compareColleges;
