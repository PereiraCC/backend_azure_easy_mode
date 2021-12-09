"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    // Initial Category data
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    fromJson() {
        return {
            "id": this.id,
            "name": this.name
        };
    }
}
exports.default = Category;
//# sourceMappingURL=category.js.map