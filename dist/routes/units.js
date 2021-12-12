"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const units_1 = require("../controllers/units");
const files_validation_1 = require("../middlewares/files-validation");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)('id', 'The id field is required').not().isEmpty(),
    (0, express_validator_1.check)('id_module', 'The id module field is required').not().isEmpty(),
    (0, express_validator_1.check)('title', 'The title field is required').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], units_1.postUnit);
router.put('/:id_module/:id', [
    files_validation_1.fileValidationUpload,
    (0, express_validator_1.check)('id', 'The id field is required').not().isEmpty(),
    (0, express_validator_1.check)('id_module', 'The id module field is required').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], units_1.uploadDocument);
router.get('/:id_module', [
    (0, express_validator_1.check)('id_module', 'The id module field is required').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], units_1.getAllUnits);
router.get('/:id_module/:id', [
    (0, express_validator_1.check)('id', 'The id field is required').not().isEmpty(),
    (0, express_validator_1.check)('id_module', 'The id module field is required').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], units_1.getAnUnit);
exports.default = router;
//# sourceMappingURL=units.js.map