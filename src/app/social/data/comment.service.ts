import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Comment } from './comment.model';

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	httpClient = inject(HttpClient);
	apiBaseUrl = environment.apiBaseUrl;

	public get(recipeId: string): Observable<Comment[]> {
		return this.httpClient.get<Comment[]>(`/api/v1/comments`, {
			params: {
				recipeId,
			},
		});
	}

	public add(comment: Comment): Observable<Comment> {
		return this.httpClient.post<Comment>('/api/v1/comments', comment);
	}
}
