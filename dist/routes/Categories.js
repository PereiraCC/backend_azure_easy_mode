"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../controllers/categories");
// Instance of router
const router = (0, express_1.Router)();
// Create a new Category
router.post('/', [
// check('identification','The identification field is required.').not().isEmpty(),
], categories_1.postCategories);
// Get all Categories
router.get('/', categories_1.getAllCategories);
// Get a Category
router.get('/:id', [], categories_1.getCategoryById);
exports.default = router;
//# sourceMappingURL=categories.js.map