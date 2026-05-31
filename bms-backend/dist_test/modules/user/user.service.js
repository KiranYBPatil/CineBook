"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = require("bcryptjs");
const createUser = async (data) => {
    const hashedPassword = await (0, bcryptjs_1.hash)(data.password, 10);
    return user_model_1.default.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
    });
};
exports.createUser = createUser;
const validateUser = async (email, password) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        return null;
    const isMatch = await (0, bcryptjs_1.compare)(password, user.password);
    return isMatch ? user : null;
};
exports.validateUser = validateUser;
