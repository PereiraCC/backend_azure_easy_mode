"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const units_1 = require("../controllers/units");
const router = (0, express_1.Router)();
router.post('/', [], units_1.postUnit);
router.put('/:id_module/:id', [], units_1.uploadDocument);
router.get('/:id_module', [], () => { });
router.get('/:id_module/:id', [], () => { });
exports.default = router;
//# sourceMappingURL=units.js.map