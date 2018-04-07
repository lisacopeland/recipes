import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(
      'https://recipe-book-98480.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes()
    );
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    this.http
      .get(
        'https://recipe-book-98480.firebaseio.com/recipes.json?auth=' + token
      )
      .map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
