import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { FirstLetterPipe } from '../../util/first-letter.pipe';
import { Comment } from '../../data/comment.model';

@Component({
	selector: 'app-comments',
	imports: [DatePipe, RatingModule, FormsModule, FirstLetterPipe],
	templateUrl: './comments.component.html',
	styleUrl: './comments.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
	comments = input<Comment[]>();
}
