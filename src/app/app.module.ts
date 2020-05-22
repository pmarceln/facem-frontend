import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './reducers';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        StoreModule.forRoot(reducers, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
