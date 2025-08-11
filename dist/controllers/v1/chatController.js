"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listChatSessions = listChatSessions;
exports.createChatSession = createChatSession;
exports.listChatMessages = listChatMessages;
exports.createChatMessage = createChatMessage;
const database_1 = require("../../config/database");
async function listChatSessions(req, res) {
    try {
        const { data, error } = await database_1.supabase
            .from('chat_sessions')
            .select('*')
            .eq('user_id', req.user.userId)
            .order('updated_at', { ascending: false });
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function createChatSession(req, res) {
    try {
        const payload = { ...req.body, user_id: req.user.userId };
        const { data, error } = await database_1.supabase.from('chat_sessions').insert(payload).select('*').single();
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.status(201).json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function listChatMessages(req, res) {
    const { sessionId } = req.params;
    try {
        const { data, error } = await database_1.supabase
            .from('chat_messages')
            .select('*')
            .eq('session_id', sessionId)
            .order('created_at', { ascending: true });
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function createChatMessage(req, res) {
    try {
        const payload = { ...req.body, user_id: req.user.userId };
        const { data, error } = await database_1.supabase.from('chat_messages').insert(payload).select('*').single();
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.status(201).json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
//# sourceMappingURL=chatController.js.map