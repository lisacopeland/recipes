// This component shows the recipe detail on the right hand side of the screen
// with the buttons to manage the recipe

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']

})
export class RecipeDetailComponent implements OnInit {
	thisRecipe: Recipe;
	id: number;

	constructor(private recipeService: RecipeService,
				private route: ActivatedRoute,
				private router: Router) { }

  	ngOnInit() {
  		this.route.params
  			.subscribe(
  				(params: Params) =>{
					this.id = +params['id'];
					this.thisRecipe = this.recipeService.getRecipe(this.id);
  				})
  	}
		
	onAddIngredients() {

		this.recipeService.addIngredientsToShoppingList(this.thisRecipe.ingredients);
	}

	onEditRecipe() {
		// The following works fine, but if you want to explicitly express the id use the second
		//this.router.navigate(['edit'], {relativeTo: this.route});
		this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  	
  	}

  	onDeleteRecipe() {
  		this.recipeService.deleteRecipe(this.id);
  		this.router.navigate(['/recipes']);
  	}

}
