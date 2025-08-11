"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCounts = getCounts;
const database_1 = require("../../config/database");
async function getCounts(req, res) {
    try {
        const userId = req.user.userId;
        const [{ count: tracksCount }, { count: logsCount }, { count: foodsCount }] = await Promise.all([
            database_1.supabase.from('health_tracks').select('*', { count: 'exact', head: true }).eq('user_id', userId),
            database_1.supabase.from('daily_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
            database_1.supabase.from('food_ratings').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        ]);
        return res.json({ success: true, data: { tracksCount, logsCount, foodsCount } });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
//# sourceMappingURL=analyticsController.js.map