import { FastifyReply, FastifyRequest } from "fastify";
import { Document, Model } from "mongoose";
import { IngredientInterface } from "../interfaces";

interface IngredientDocument extends Document, IngredientInterface {}

class IngredientModule {
	Ingredient: Model<IngredientDocument>;
	constructor({
		IngredientModel,
	}: { IngredientModel: Model<IngredientDocument> }) {
		this.Ingredient = IngredientModel;
		console.log("IngredientModule loaded");
	}

	async createIngredient(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		const { name, price, stock, unitMeasure } =
			request.body as IngredientInterface;

		try {
			const newIngredient = await this.Ingredient.create({
				name,
				price,
				stock,
				unitMeasure,
			});
			await newIngredient.save();
			return reply
				.code(202)
				.send({ message: "Ingredient created", data: newIngredient });
		} catch (error) {
			console.log(error);
			return reply
				.code(500)
				.send({ message: "Error creating Ingredient", error });
		}
	}

	async updateIngredient(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		const { id } = request.params as { id: string };
		const { name, price, stock, unitMeasure } =
			request.body as IngredientInterface;
		try {
			const existingIngredient = await this.Ingredient.findById(id);
			if (!existingIngredient) {
				return reply.code(404).send({ message: "Ingredient not found" });
			}
			const updatedIngredient = await this.Ingredient.findByIdAndUpdate(
				id,
				{ name, price, stock, unitMeasure },
				{ new: true }
			);
			
			return reply
				.code(202)
				.send({ message: "Ingredient updated", data: updatedIngredient });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error updating Ingredient", error });
		}
	}

	async deleteIngredient(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		const { id } = request.params as { id: string };
		try {
			const deletedIngredient = await this.Ingredient.findByIdAndDelete(id);
			if (!deletedIngredient) {
				return reply.code(404).send({ message: "Ingredient not found" });
			}
			return reply
				.code(202)
				.send({ message: "Ingredient deleted", data: deletedIngredient });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error deleting Ingredient", error });
		}
	}

	async getAllIngredients(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		try {
			const ingredients = await this.Ingredient.find();
			return reply
				.code(200)
				.send({ message: "ingredients found", data: ingredients });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error getting ingredients", error });
		}
	}

	async getIngredientById(
		request: FastifyRequest<{ Body: IngredientDocument }>,
		reply: FastifyReply,
	) {
		const { id } = request.params as { id: string };
		try {
			const ingredient = await this.Ingredient.findById(id);
			if (!ingredient) {
				return reply.code(404).send({ message: "Ingredient not found" });
			}
			return reply
				.code(200)
				.send({ message: "Ingredient found", data: ingredient });
		} catch (error) {
			return reply
				.code(500)
				.send({ message: "Error getting ingredient", error });
		}
	}
}

export default IngredientModule;
