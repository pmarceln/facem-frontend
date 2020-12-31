import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { login } from './auth/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

    public title = 'facem.graphics';

    constructor(private ngStore: Store<AppState>) {}

    ngOnInit(): void {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
    }
}
