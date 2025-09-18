import { Component } from '@angular/core';
import { HeaderComponent } from './shared/ui/header/header.component';
import { RecipeService } from './recipe/data/recipe.service';

@Component({
	selector: 'app-root',
	imports: [HeaderComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'recipes';

	constructor(private service: RecipeService) {
		this.service.get().subscribe((data) => console.log(data));
	}
}
