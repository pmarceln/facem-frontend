import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap( action => {
                localStorage.setItem('user', action.user.email);
                localStorage.setItem('token', action.token);
            })
        ),
        { dispatch: false }
    );

    logout$ = createEffect( () =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');

                this.route.navigateByUrl('/login');
            })
        ),
        { dispatch: false }
    );


    constructor(private actions$: Actions, private route: Router) { }
}
