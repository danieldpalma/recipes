import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { Comment } from '../../data/comment.model';

@Component({
	selector: 'app-review',
	imports: [RatingModule, ButtonModule, FormsModule],
	templateUrl: './review.component.html',
	styleUrl: './review.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {
	comments = input<Comment[]>();
	addRatingEvent = output<void>();

	rating = 0;
	map = new Map<number, number>();

	ngOnChanges(): void {
		const comments = this.comments();
		if (comments) {
			this.rating =
				comments.length <= 0
					? 0
					: comments.reduce((acc, comment) => acc + comment.rating, 0) /
					  comments.length;
			for (let i = 5; i > 0; i--) {
				this.map.set(
					i,
					comments.filter((comment) => comment.rating === i).length
				);
			}
		}
	}

	get entries() {
		return Array.from(this.map.entries());
	}
}
