"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const categories_1 = __importDefault(require("../routes/categories"));
const modules_1 = __importDefault(require("../routes/modules"));
const units_1 = __importDefault(require("../routes/units"));
class Server {
    constructor() {
        this.apiPaths = {
            categories: '/api/categories',
            modules: '/api/modules',
            units: '/api/units',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8083';
        // Middlewares
        this.middlewares();
        // Set Routes
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Reader body
        this.app.use(express_1.default.json());
        // Share folder
        this.app.use(express_1.default.static('public'));
        // Fileupload
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.apiPaths.categories, categories_1.default);
        this.app.use(this.apiPaths.modules, modules_1.default);
        this.app.use(this.apiPaths.units, units_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map