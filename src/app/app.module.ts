import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { TokenInterceptor } from './auth/_interceptor/token.interceptor';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        StoreModule.forRoot(reducers, {
            // metaReducers,
            runtimeChecks: {
                strictActionImmutability: true,
                strictActionWithinNgZone: true,
                strictActionSerializability: true,
                strictStateSerializability: true
            }
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot(),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router', routerState: RouterState.Minimal }),
        BrowserAnimationsModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
