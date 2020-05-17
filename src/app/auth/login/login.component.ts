import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../_service/auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { noop } from 'rxjs/internal/util/noop';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.form = fb.group({
            email: ['pmarceln@yahoo.com', [Validators.required]],
            password: ['qwerty', [Validators.required]]
        });
    }

    ngOnInit(): void {}

    login() {
        const val = this.form.value;
        this.authService.login(val.email, val.password)
        .pipe(
            tap((user) => {
                console.log(user);

                // this.store.dispatch(login({ user }));

                // this.router.navigateByUrl('/courses');
            })
        )
        .subscribe(noop, () => alert('Login Failed'));
    }
}
