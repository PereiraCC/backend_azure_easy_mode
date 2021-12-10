"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryById = exports.getAllCategories = exports.postCategories = void 0;
const config_1 = __importDefault(require("../db/config"));
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
const category_1 = __importDefault(require("../models/category"));
// Reference to collection of users in firebase
const categoriesRef = config_1.default.collection('categories');
const postCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    try {
        const category = new category_1.default(id, name);
        const data = category.fromJson();
        const doc = yield categoriesRef.add(data);
        res.status(201).json({
            ok: true,
            uid: doc.id,
            data
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create a category'
        });
    }
});
exports.postCategories = postCategories;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, from = 1 } = req.query;
    try {
        // Get all data to the limit
        const data = yield categoriesRef
            .orderBy("id")
            .limit(limit).get();
        // Verification if docs
        if (from > data.docs.length || data.docs.length == 0) {
            return res.status(200).json({
                ok: true,
                total: 0,
                documents: []
            });
        }
        // Get data with filters
        const resp = yield categoriesRef
            .orderBy('id')
            .limit(limit)
            .startAt(data.docs[from - 1])
            .where('status', '==', true).get();
        // Send data
        return res.status(200).json({
            ok: true,
            total: resp.docs.length,
            documents: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: Get all categories'
        });
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Get all categories with status true and id equal
        const resp = yield categoriesRef.where('status', '==', true)
            .where('id', '==', id).get();
        // Verification if there are documents
        if (resp.docs.length == 0) {
            return res.status(404).json({
                msg: 'Category with that ID not found in the database.'
            });
        }
        // Send data
        return res.status(200).json({
            ok: true,
            documents: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: Get a category by Id'
        });
    }
});
exports.getCategoryById = getCategoryById;
//# sourceMappingURL=categories.js.map