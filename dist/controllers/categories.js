"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryById = exports.getAllCategories = exports.postCategories = void 0;
const config_1 = __importDefault(require("../db/config"));
// Reference to collection of users in firebase
const categoriesRef = config_1.default.collection('categories');
const postCategories = (req, res) => {
    const { id, name } = req.body;
    try {
        res.status(200).json({
            msg: 'Create a category',
            id, name
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create a category'
        });
    }
};
exports.postCategories = postCategories;
const getAllCategories = (req, res) => {
    try {
        res.status(200).json({
            msg: 'Get all categories'
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: Get all categories'
        });
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => {
    const { id } = req.params;
    try {
        res.status(200).json({
            msg: 'Get a category by Id',
            id
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: Get a category by Id'
        });
    }
};
exports.getCategoryById = getCategoryById;
//# sourceMappingURL=categories.js.map