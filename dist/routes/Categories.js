"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categories_1 = require("../controllers/categories");
const inputs_validation_1 = require("../middlewares/inputs-validation");
// Instance of router
const router = (0, express_1.Router)();
// Create a new Category
router.post('/', [
    (0, express_validator_1.check)('id', 'The id field is required.').not().isEmpty(),
    (0, express_validator_1.check)('name', 'The name field is required.').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], categories_1.postCategories);
// Get all Categories
router.get('/', categories_1.getAllCategories);
// Get a Category
router.get('/:id', [], categories_1.getCategoryById);
exports.default = router;
//# sourceMappingURL=categories.js.map