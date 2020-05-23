import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { loadData } from './gallery.actions';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.store.dispatch(loadData());
    }
}
