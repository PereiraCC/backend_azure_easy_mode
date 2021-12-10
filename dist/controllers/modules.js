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
exports.getModuleById = exports.getAllModules = exports.postModule = void 0;
const config_1 = __importDefault(require("../db/config"));
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
const module_1 = __importDefault(require("../models/module"));
// Reference to collection of users in firebase
const modulesRef = config_1.default.collection('modules');
const postModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_category, name } = req.body;
    try {
        const mod = new module_1.default(id, id_category, name);
        const data = mod.fromJson();
        const doc = yield modulesRef.add(data);
        res.status(201).json({
            ok: true,
            uid: doc.id,
            data
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create a module'
        });
    }
});
exports.postModule = postModule;
const getAllModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_category } = req.params;
    const { limit = 10, from = 1 } = req.query;
    try {
        // Get all data to the limit
        const data = yield modulesRef
            .where('id_category', '==', id_category)
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
        const resp = yield modulesRef
            .orderBy('id')
            .limit(limit)
            .startAt(data.docs[from - 1])
            .where('id_category', '==', id_category)
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
exports.getAllModules = getAllModules;
const getModuleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_category } = req.params;
    try {
        // Get all categories with status true and id equal
        const resp = yield modulesRef.where('status', '==', true)
            .where('id', '==', id)
            .where('id_category', '==', id_category).get();
        // Verification if there are documents
        if (resp.docs.length == 0) {
            return res.status(404).json({
                msg: 'Module with that ID not found in the database.'
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
            msg: 'Error: Get a module by Id'
        });
    }
});
exports.getModuleById = getModuleById;
//# sourceMappingURL=modules.js.map