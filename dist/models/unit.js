"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Unit {
    constructor(id, id_module, title, document = '', status = true) {
        this.id = id;
        this.id_module = id_module;
        this.title = title;
        this.document = document;
        this.status = status;
    }
    fromJson() {
        return {
            "id": this.id,
            "id_module": this.id_module,
            "tilte": this.title,
            "document": this.document,
            "status": this.status,
        };
    }
}
exports.default = Unit;
//# sourceMappingURL=unit.js.map