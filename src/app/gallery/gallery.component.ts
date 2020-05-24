import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { loadData } from './gallery.actions';
import { selectHasData } from './gallery.selectors';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.store.pipe(select(selectHasData)).subscribe(
            (has: boolean) => {
                if (!has) {
                    this.store.dispatch(loadData());
                }
            }
        );
    }
}
