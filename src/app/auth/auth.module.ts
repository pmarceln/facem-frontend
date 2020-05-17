import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './_service/auth.service';


@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [AuthService]
})
export class AuthModule {}
