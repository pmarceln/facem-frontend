import { Component, OnInit } from '@angular/core';
import { StoreService } from './_service/store.service';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

    public title = 'facem.graphics';

    constructor(private store: StoreService, private ngStore: Store<AppState>) {}

    ngOnInit(): void {
        this.ngStore.subscribe(
            (state) => {
                console.log(state);
            }
        );
    }
}
