"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Module {
    constructor(id, id_category, name, status = true) {
        this.id = id;
        this.id_category = id_category;
        this.name = name;
        this.status = status;
    }
    fromJson() {
        return {
            "id": this.id,
            "id_category": this.id_category,
            "name": this.name,
            "status": this.status
        };
    }
}
exports.default = Module;
//# sourceMappingURL=module.js.map