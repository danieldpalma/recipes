import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import {
	HttpTestingController,
	provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockComments } from './comment.mock';
import { Comment } from './comment.model';

describe('CommentService', () => {
	let service: CommentService;
	let controller: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(CommentService);
		controller = TestBed.inject(HttpTestingController);
	});

	it('deve buscar comentários para uma receita especifica', (done) => {
		const recipeId = '1';

		service.get(recipeId).subscribe((comments) => {
			expect(comments).toEqual(mockComments);
			done();
		});

		const req = controller.expectOne(`api/v1/comments?recipe?=${recipeId}`);
		expect(req.request.method).toEqual('GET');
		req.flush(mockComments);
	});

	it('deve adicionar um novo comentário e atualizar o estado local', (done) => {
		const newComment = {
			id: '3',
			createdAt: new Date(),
			recipeId: '1',
			userId: '3',
			userName: 'Charlie',
			rating: 3,
			comment: 'Achei a receita meio sem graça.',
		} as Comment;

		service.add(newComment).subscribe((comment) => {
			expect(comment).toEqual(newComment);
			expect(service.comments()).toContain(newComment);
			done();
		});

		const req = controller.expectOne('/api/v1/comments');
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toEqual(newComment);
		req.flush(newComment);
	});
});
