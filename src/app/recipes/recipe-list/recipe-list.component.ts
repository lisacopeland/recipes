// This component creates the list of recipes on the left hand side
// Recipe-item shows the items in this list
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createNew() {
    this.router.navigate(['new'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve'
    });
  }

  // We don't need this anymore because the recipe service is emitting the event
  /*
  onRecipeSelected(thisRecipe: Recipe) {
    this.recipeWasChosen.emit(thisRecipe);
  }
  */
}
