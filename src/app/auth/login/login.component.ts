import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../_service/auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { noop } from 'rxjs/internal/util/noop';
import { Router } from '@angular/router';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { AuthActions } from '../action-types';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private store: Store<AppState>
    ) {
        this.form = fb.group({
            email: ['pmarceln@yahoo.com', [Validators.required]],
            password: ['qwerty', [Validators.required]],
        });
    }

    ngOnInit(): void {}

    login() {
        const val = this.form.value;
        this.authService
            .login(val.email, val.password)
            .pipe(
                tap((data) => {
                    this.store.dispatch(AuthActions.login({ user: data.user, token: data.token }));
                    this.router.navigateByUrl('/admin');
                })
            )
            .subscribe(noop, noop);
    }
}
