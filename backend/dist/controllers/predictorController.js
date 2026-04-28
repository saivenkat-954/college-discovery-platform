"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictColleges = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const predictColleges = async (req, res, next) => {
    try {
        const { rank, category, state } = req.body;
        if (!rank) {
            return next(new errorMiddleware_1.AppError('Please provide your rank', 400));
        }
        // Basic logic: Colleges where the cutoff is greater than or equal to the rank
        // In reality, cutoffs are more complex, but for an MVP, this is the core rule.
        const suggestedColleges = await prisma_1.default.college.findMany({
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
    }
    catch (error) {
        next(error);
    }
};
exports.predictColleges = predictColleges;
