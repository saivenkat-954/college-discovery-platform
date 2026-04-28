"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const collegeRoutes_1 = __importDefault(require("./routes/collegeRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const predictorRoutes_1 = __importDefault(require("./routes/predictorRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/colleges', collegeRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/predictor', predictorRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend is running' });
});
// Error handling
app.use(errorMiddleware_1.errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
