import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { isProjectSelected } from '../gallery/gallery.selectors';
import { GallaryState } from '../gallery/reducers/gallery.reducers';

@Injectable()
export class ProjectGuard implements CanActivate {

    constructor(private store: Store<GallaryState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isProjectSelected),
            tap(project => {
                if (!project) {
                    this.router.navigateByUrl('/');
                }
            })
        );
    }
}
