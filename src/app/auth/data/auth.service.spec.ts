import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
	HttpTestingController,
	provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockSession } from './session.mock';

describe('AuthService', () => {
	let service: AuthService;
	let controller: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(AuthService);
		controller = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('deve fazer login e armazenar o token no localStorage', (done) => {
		service.login('user', 'password').subscribe(() => {
			expect(localStorage.getItem('token')).toBe(mockSession[0].token);
			done();
		});
	});

	it('deve remover o token do localStorage ao fazer logout', () => {
		localStorage.setItem('token', mockSession[0].token);
		service.logout();
		expect(localStorage.getItem('token')).toBeNull();
	});

	it('deve retornar o nome do usuário a partir do token', () => {
		localStorage.setItem('token', mockSession[0].token);
		expect(service.getUsername()).toBe('Teste');
	});

	it('deve retornar true se o token for válido', () => {
		localStorage.setItem('token', mockSession[0].token);
		expect(service.isAuthenticated()).toBeTrue();
	});

	it('deve retornar false se o token não existe', () => {
		expect(service.isAuthenticated()).toBeFalse();
	});
});
