"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const modules_1 = require("../controllers/modules");
const inputs_validation_1 = require("../middlewares/inputs-validation");
// Instance of router
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)('id', 'The id field is required.').not().isEmpty(),
    (0, express_validator_1.check)('id_category', 'The id Category field is required.').not().isEmpty(),
    (0, express_validator_1.check)('name', 'The name Category field is required.').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], modules_1.postModule);
router.get('/:id_category', [
    (0, express_validator_1.check)('id_category', 'The id category field is required.').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], modules_1.getAllModules);
router.get('/:id_category/:id', [
    (0, express_validator_1.check)('id', 'The id field is required.').not().isEmpty(),
    (0, express_validator_1.check)('id_category', 'The id category field is required.').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], modules_1.getModuleById);
exports.default = router;
//# sourceMappingURL=modules.js.map