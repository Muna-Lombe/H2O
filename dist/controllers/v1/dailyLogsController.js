"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDailyLogs = listDailyLogs;
exports.createDailyLog = createDailyLog;
exports.getDailyLog = getDailyLog;
exports.updateDailyLog = updateDailyLog;
exports.deleteDailyLog = deleteDailyLog;
const database_1 = require("../../config/database");
async function listDailyLogs(req, res) {
    const { trackId } = req.query;
    try {
        let query = database_1.supabase
            .from('daily_logs')
            .select('*')
            .eq('user_id', req.user.userId)
            .order('date', { ascending: false });
        if (trackId)
            query = query.eq('track_id', trackId);
        const { data, error } = await query;
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function createDailyLog(req, res) {
    try {
        const payload = { ...req.body, user_id: req.user.userId };
        const { data, error } = await database_1.supabase.from('daily_logs').insert(payload).select('*').single();
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.status(201).json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function getDailyLog(req, res) {
    const { id } = req.params;
    try {
        const { data, error } = await database_1.supabase
            .from('daily_logs')
            .select('*')
            .eq('id', id)
            .eq('user_id', req.user.userId)
            .single();
        if (error)
            return res.status(404).json({ success: false, error: 'Daily log not found' });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function updateDailyLog(req, res) {
    const { id } = req.params;
    try {
        const updates = { ...req.body, updated_at: new Date().toISOString() };
        const { data, error } = await database_1.supabase
            .from('daily_logs')
            .update(updates)
            .eq('id', id)
            .eq('user_id', req.user.userId)
            .select('*')
            .single();
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function deleteDailyLog(req, res) {
    const { id } = req.params;
    try {
        const { error } = await database_1.supabase
            .from('daily_logs')
            .delete()
            .eq('id', id)
            .eq('user_id', req.user.userId);
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.status(204).send();
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
//# sourceMappingURL=dailyLogsController.js.map