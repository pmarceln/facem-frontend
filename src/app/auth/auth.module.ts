import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './auth-guard';
import { authReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth-effects';

import { AuthService } from './_service/auth.service';

import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [AuthService, AuthGuard],
})
export class AuthModule {}
