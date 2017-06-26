import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
		new Recipe(
			'A test Recipe', 
			'A test recipe description', 
			'http://www.seriouseats.com/recipes/assets_c/2015/12/20151218-braised-chicken-thigh-cabbage-pancetta-recipe-kenji-14-thumb-1500xauto-428923.jpg',
			[ 
				new Ingredient('Meat', 1),
				new Ingredient('Noodles', 3),
				new Ingredient('Onions', 2),  
			]),
			
		new Recipe(
			'Test Recipe 2', 
			'Another test recipe description', 
			'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
			[
				new Ingredient('Tomatos', 4),
				new Ingredient('Pickles', 10),
				new Ingredient('Bread', 2),
			]),
		new Recipe(
			'Test Recipe 3', 
			'One more test recipe description', 
			'http://static2.businessinsider.com/image/51f03f966bb3f73c7700000b/19-fast-food-hacks-that-will-change-the-way-you-order.jpg',
			[])

	];

	constructor(private slService: ShoppingListService) {}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
		
	} 

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	} 

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());	
	}
}