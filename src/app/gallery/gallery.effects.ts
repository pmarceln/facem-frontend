import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StoreService } from '../_service/store.service';
import { concatMap, map } from 'rxjs/operators';
import { dataLoaded } from './gallery.actions';

@Injectable()
export class GalleryEffects {

    loadData$ = createEffect(
        () => this.actions$.pipe(
            ofType('[App Load] Load Data'),
            concatMap(
                action => this.storeService.getAllData()
            ),
            map(data => dataLoaded({ filters: data.filters, projects: data.projects }))
        )
    );

    constructor(private actions$: Actions, private storeService: StoreService) { }
}
