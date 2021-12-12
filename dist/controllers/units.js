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
exports.getAnUnit = exports.getAllUnits = exports.uploadDocument = exports.postUnit = void 0;
const unit_1 = __importDefault(require("../models/unit"));
const config_1 = require("../db/config");
const modules_1 = require("./modules");
const uploadFile_1 = require("../helpers/uploadFile");
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
// Reference to collection of users in firebase
const unitsRef = config_1.firestore.collection('units');
const postUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_module, title } = req.body;
    try {
        const unit = new unit_1.default(id, id_module, title);
        const dataJson = unit.fromJson();
        const doc = yield unitsRef.add(dataJson);
        return res.status(201).json({
            ok: true,
            uid: doc.id,
            unit: dataJson
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create an unit'
        });
    }
});
exports.postUnit = postUnit;
const uploadDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id_module, id } = req.params;
    try {
        const { tempFilePath, name } = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        const moduleRef = yield (0, modules_1.getModule)(id_module);
        const urlFile = yield (0, uploadFile_1.uploadFile)(tempFilePath, name, moduleRef === null || moduleRef === void 0 ? void 0 : moduleRef.data().name);
        let docRef = yield getUnit(id, id_module);
        yield unitsRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update({
            document: urlFile
        });
        docRef = yield getUnit(id, id_module);
        res.status(200).json({
            ok: true,
            uid: docRef === null || docRef === void 0 ? void 0 : docRef.id,
            unit: docRef === null || docRef === void 0 ? void 0 : docRef.data()
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create an unit'
        });
    }
});
exports.uploadDocument = uploadDocument;
const getAllUnits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_module } = req.params;
    const { limit = 10, from = 1 } = req.query;
    try {
        // Get all data to the limit
        const data = yield unitsRef
            .where('id_module', '==', id_module)
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
        const resp = yield unitsRef
            .orderBy('id')
            .limit(limit)
            .startAt(data.docs[from - 1])
            .where('id_module', '==', id_module)
            .where('status', '==', true).get();
        // Send data
        return res.status(200).json({
            ok: true,
            total: resp.docs.length,
            documents: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
        });
    }
    catch (err) {
        console.log(`Error ${err}`);
        return res.status(500).json({
            msg: 'Error: get all units'
        });
    }
});
exports.getAllUnits = getAllUnits;
const getAnUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_module } = req.params;
    try {
        // Get all categories with status true and id equal
        const resp = yield unitsRef.where('status', '==', true)
            .where('id', '==', id)
            .where('id_module', '==', id_module).get();
        // Verification if there are documents
        if (resp.empty) {
            return res.status(404).json({
                msg: 'Unit with that ID not found in the database.'
            });
        }
        // Send data
        return res.status(200).json({
            ok: true,
            documents: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error: get an unit'
        });
    }
});
exports.getAnUnit = getAnUnit;
const getUnit = (id, id_module) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtain all agents with status true / false (param) and id equal
    const resp = yield unitsRef.where('status', '==', true)
        .where('id', '==', id)
        .where('id_module', '==', id_module).get();
    // From the list obtain documento with id equal
    const docRef = resp.docs.find((doc) => {
        if (doc.data().id === id) {
            return doc;
        }
    });
    return docRef;
});
//# sourceMappingURL=units.js.map