"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTracks = listTracks;
exports.createTrack = createTrack;
exports.getTrack = getTrack;
exports.updateTrack = updateTrack;
exports.deleteTrack = deleteTrack;
const database_1 = require("../../config/database");
async function listTracks(req, res) {
    try {
        const { data, error } = await database_1.supabase
            .from('health_tracks')
            .select('*')
            .eq('user_id', req.user.userId)
            .order('created_at', { ascending: false });
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function createTrack(req, res) {
    try {
        const body = req.body || {};
        const payload = { ...body, user_id: req.user.userId };
        const { data, error } = await database_1.supabase.from('health_tracks').insert(payload).select('*').single();
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.status(201).json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function getTrack(req, res) {
    try {
        const { id } = req.params;
        const { data, error } = await database_1.supabase
            .from('health_tracks')
            .select('*')
            .eq('id', id)
            .eq('user_id', req.user.userId)
            .single();
        if (error)
            return res.status(404).json({ success: false, error: 'Track not found' });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function updateTrack(req, res) {
    try {
        const { id } = req.params;
        const updates = { ...req.body, updated_at: new Date().toISOString() };
        const { data, error } = await database_1.supabase
            .from('health_tracks')
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
async function deleteTrack(req, res) {
    try {
        const { id } = req.params;
        const { error } = await database_1.supabase
            .from('health_tracks')
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
//# sourceMappingURL=tracksController.js.map