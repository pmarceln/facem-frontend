import { Component } from '@angular/core';
import { StoreService } from './_service/store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    public title = 'facem.graphics';

    constructor(private store: StoreService) {}
}
