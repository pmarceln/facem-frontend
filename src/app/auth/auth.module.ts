import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './auth-guard';
import { AuthService } from './_service/auth.service';

import { LoginComponent } from './login/login.component';
import { authReducer } from './reducers';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StoreModule.forFeature('auth', authReducer),
    ],
    providers: [AuthService, AuthGuard]
})
export class AuthModule {}
