"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    // Initial Category data
    constructor(id, name, status = true) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
    fromJson() {
        return {
            "id": this.id,
            "name": this.name,
            "status": this.status
        };
    }
}
exports.default = Category;
//# sourceMappingURL=category.js.map