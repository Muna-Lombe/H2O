"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/v1/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateJwt);
router.post('/', (req, res) => {
    res.json({ success: true, data: { imported: true } });
});
exports.default = router;
//# sourceMappingURL=import.js.map