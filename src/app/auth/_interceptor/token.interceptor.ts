import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { logout } from '../auth.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router, private store: Store<AppState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({ setHeaders: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        return next.handle(request).pipe(
            tap(
                () => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        localStorage.clear();
                        this.store.dispatch(logout());
                        this.router.navigate(['login']);
                    }
                }
            )
        );
    }
}
