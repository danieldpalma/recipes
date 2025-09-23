import { Routes } from '@angular/router';
import { RecipeComponent } from './recipe/feature/recipe/recipe.component';
import { RecipesComponent } from './recipe/feature/recipes/recipes.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: RecipesComponent },
	{ path: 'receitas/:id', component: RecipeComponent },
	{ path: '**', redirectTo: 'home' },
];
