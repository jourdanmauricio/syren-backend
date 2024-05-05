"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./middlewares/errorHandler");
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, morgan_1.default)('prod'));
server.use((0, cors_1.default)());
require("./utils/auth");
server.use(indexRouter_1.default);
server.use(errorHandler_1.logErrors);
server.use(errorHandler_1.boomErrorHandler);
server.use(errorHandler_1.errorHandler);
exports.default = server;
//# sourceMappingURL=server.js.map