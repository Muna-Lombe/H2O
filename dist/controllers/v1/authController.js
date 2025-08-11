"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const database_1 = require("../../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../../middleware/v1/auth");
async function register(req, res) {
    const { email, password, name } = req.body;
    try {
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const { data, error } = await database_1.supabase
            .from('users')
            .insert({ email, password: passwordHash, name })
            .select('id, email, name')
            .single();
        if (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
        const token = (0, auth_1.generateToken)({ userId: data.id, email: data.email });
        return res.json({ success: true, data: { user: data, token } });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select('id, email, name, password')
            .eq('email', email)
            .single();
        if (error || !user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const isValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const token = (0, auth_1.generateToken)({ userId: user.id, email: user.email });
        return res.json({ success: true, data: { user: { id: user.id, email: user.email, name: user.name }, token } });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
//# sourceMappingURL=authController.js.map