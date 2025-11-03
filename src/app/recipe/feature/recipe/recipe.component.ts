import { Component, inject, input, OnInit } from '@angular/core';
import { RecipeService } from '../../data/recipe.service';
import { AsyncPipe } from '@angular/common';
import { RecipeDetailComponent } from '../../ui/recipe-detail/recipe-detail.component';
import { first, Observable } from 'rxjs';
import { Recipe } from '../../data/recipe.model';
import { CommentsComponent } from '../../../social/ui/comments/comments.component';
import { ReviewComponent } from '../../../social/ui/review/review.component';
import { RatingFormComponent } from '../../../social/ui/rating-form/rating-form.component';
import { Comment } from '../../../social/data/comment.model';
import { CommentService } from '../../../social/data/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visibility } from '../../../shared/data/visibility.model';

@Component({
	selector: 'app-recipe',
	imports: [
		AsyncPipe,
		RecipeDetailComponent,
		CommentsComponent,
		ReviewComponent,
		RatingFormComponent,
	],
	templateUrl: './recipe.component.html',
	styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
	id = input<string>();

	recipeService = inject(RecipeService);
	commentService = inject(CommentService);
	fb = inject(FormBuilder);

	recipe$!: Observable<Recipe>;
	comments$!: Observable<Comment[]>;

	ratingForm = this.fb.group({
		rating: ['', Validators.required],
		comment: ['', Validators.required],
	});

	showRatingForm: Visibility = { visible: false };

	ngOnInit(): void {
		const id = this.id();
		if (id) this.recipe$ = this.recipeService.getById(id);
	}

	addComment(form: FormGroup) {
		if (form.invalid) {
			form.markAllAsTouched();
			return;
		}

		const comment = {
			createdAt: new Date(),
			recipeId: this.id(),
			userId: '123456',
			userName: 'Anonimo',
			rating: form.value.rating,
			comment: form.value.comment,
		} as Comment;

		this.commentService.add(comment).pipe(first()).subscribe();
		this.closeRatingForm();
	}

	openRatingForm() {
		this.showRatingForm = { visible: true };
	}
	closeRatingForm() {
		this.showRatingForm = { visible: false };
	}
}
