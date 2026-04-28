"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedColleges = exports.unsaveCollege = exports.saveCollege = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const saveCollege = async (req, res, next) => {
    try {
        const { collegeId } = req.body;
        const userId = req.user?.id;
        if (!userId)
            return next(new errorMiddleware_1.AppError('Unauthorized', 401));
        const saved = await prisma_1.default.savedCollege.create({
            data: {
                userId,
                collegeId,
            },
        });
        res.status(201).json({
            success: true,
            data: saved,
        });
    }
    catch (error) {
        next(new errorMiddleware_1.AppError('College already saved or invalid ID', 400));
    }
};
exports.saveCollege = saveCollege;
const unsaveCollege = async (req, res, next) => {
    try {
        const { collegeId } = req.params;
        const userId = req.user?.id;
        if (!userId)
            return next(new errorMiddleware_1.AppError('Unauthorized', 401));
        await prisma_1.default.savedCollege.delete({
            where: {
                userId_collegeId: {
                    userId: userId,
                    collegeId: collegeId,
                },
            },
        });
        res.status(200).json({
            success: true,
            message: 'College removed from saved list',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.unsaveCollege = unsaveCollege;
const getSavedColleges = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return next(new errorMiddleware_1.AppError('Unauthorized', 401));
        const saved = await prisma_1.default.savedCollege.findMany({
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
            data: saved.map((s) => s.college),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSavedColleges = getSavedColleges;
