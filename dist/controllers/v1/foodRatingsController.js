"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFoodRatings = listFoodRatings;
exports.upsertFoodRating = upsertFoodRating;
exports.deleteFoodRating = deleteFoodRating;
const database_1 = require("../../config/database");
async function listFoodRatings(req, res) {
    const { trackId } = req.query;
    try {
        let query = database_1.supabase
            .from('food_ratings')
            .select('*')
            .eq('user_id', req.user.userId)
            .order('updated_at', { ascending: false });
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
async function upsertFoodRating(req, res) {
    try {
        const payload = { ...req.body, user_id: req.user.userId };
        const { data, error } = await database_1.supabase.from('food_ratings').upsert(payload, { onConflict: 'user_id,track_id,food_name' }).select('*').single();
        if (error)
            return res.status(400).json({ success: false, error: error.message });
        return res.status(201).json({ success: true, data });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function deleteFoodRating(req, res) {
    const { id } = req.params;
    try {
        const { error } = await database_1.supabase
            .from('food_ratings')
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
//# sourceMappingURL=foodRatingsController.js.map