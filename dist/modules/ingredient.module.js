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
Object.defineProperty(exports, "__esModule", { value: true });
class IngredientModule {
    constructor({ IngredientModel, }) {
        this.Ingredient = IngredientModel;
        console.log("IngredientModule loaded");
    }
    createIngredient(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, stock, unitMeasure } = request.body;
            try {
                const newIngredient = yield this.Ingredient.create({
                    name,
                    price,
                    stock,
                    unitMeasure,
                });
                yield newIngredient.save();
                return reply
                    .code(202)
                    .send({ message: "Ingredient created", data: newIngredient });
            }
            catch (error) {
                console.log(error);
                return reply
                    .code(500)
                    .send({ message: "Error creating Ingredient", error });
            }
        });
    }
    updateIngredient(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { name, price, stock, unitMeasure } = request.body;
            try {
                const existingIngredient = yield this.Ingredient.findById(id);
                if (!existingIngredient) {
                    return reply.code(404).send({ message: "Ingredient not found" });
                }
                const updatedIngredient = yield this.Ingredient.findByIdAndUpdate(id, { name, price, stock, unitMeasure }, { new: true });
                return reply
                    .code(202)
                    .send({ message: "Ingredient updated", data: updatedIngredient });
            }
            catch (error) {
                return reply
                    .code(500)
                    .send({ message: "Error updating Ingredient", error });
            }
        });
    }
    deleteIngredient(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const deletedIngredient = yield this.Ingredient.findByIdAndDelete(id);
                if (!deletedIngredient) {
                    return reply.code(404).send({ message: "Ingredient not found" });
                }
                return reply
                    .code(202)
                    .send({ message: "Ingredient deleted", data: deletedIngredient });
            }
            catch (error) {
                return reply
                    .code(500)
                    .send({ message: "Error deleting Ingredient", error });
            }
        });
    }
    getAllIngredients(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingredients = yield this.Ingredient.find();
                return reply
                    .code(200)
                    .send({ message: "ingredients found", data: ingredients });
            }
            catch (error) {
                return reply
                    .code(500)
                    .send({ message: "Error getting ingredients", error });
            }
        });
    }
    getIngredientById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const ingredient = yield this.Ingredient.findById(id);
                if (!ingredient) {
                    return reply.code(404).send({ message: "Ingredient not found" });
                }
                return reply
                    .code(200)
                    .send({ message: "Ingredient found", data: ingredient });
            }
            catch (error) {
                return reply
                    .code(500)
                    .send({ message: "Error getting ingredient", error });
            }
        });
    }
}
exports.default = IngredientModule;
