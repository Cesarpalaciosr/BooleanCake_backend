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
exports.createProducts = exports.test3 = exports.test2 = exports.test1 = void 0;
const produtcs_module_1 = __importDefault(require("../../modules/produtcs.module"));
const ProductsModule = new produtcs_module_1.default();
const test1 = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const params = request.body;
    try {
        return reply.code(200).send({ message: "hello", data: params });
    }
    catch (error) {
        return reply.code(500).send({ message: "error" });
    }
});
exports.test1 = test1;
const test2 = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return reply.code(200).send({ message: "hello" });
    }
    catch (error) {
        return reply.code(500).send({ message: "error" });
    }
});
exports.test2 = test2;
const test3 = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = request.params;
        return reply.code(200).send({ params: params });
    }
    catch (error) {
        return reply.code(500).send({ message: "error" });
    }
});
exports.test3 = test3;
const createProducts = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductsModule.createProducts(request, reply);
});
exports.createProducts = createProducts;
