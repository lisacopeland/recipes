import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Fruit Salad',
      'A fresh fruit salad arranged attractively on a platter',
      './assets/fruit salad.png',
      [
        new Ingredient('Strawberries', 1),
        new Ingredient('Kiwi Fruit', 3),
        new Ingredient('Pineapple', 2)
      ]
    ),

    new Recipe(
      'Shrimp Cobb Salad',
      'A fresh salad with shrimp, avocado, and romaine lettuce',
      './assets/shrimp cobb salad.png',
      [
        new Ingredient('Shrimp', 4),
        new Ingredient('Avocado', 10),
        new Ingredient('Romaine Lettuce', 2)
      ]
    ),
    new Recipe(
      'Vegetable Fried Rice',
      'A healthy vegetarian stir-fried rice dish',
      './assets/vegetable-fried-rice.jpg',
      [
        new Ingredient('Brown Rice', 4),
        new Ingredient('Asparagus', 10),
        new Ingredient('Green Onions', 2)
      ]
    )
  ];

  constructor(private http: Http, private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

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
