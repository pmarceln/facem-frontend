import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/_service/store.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectFilters, selectFilterId, selectProject } from '../gallery.selectors';

import { Filter } from 'src/app/_model/filter.model';
import { Project } from 'src/app/_model/project.model';
import { menuClick } from '../gallery.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    public filters$: Observable<Filter[]>;
    public filterIdSubject: Observable<number>;
    public selectedProject$: Observable<Project>;

    constructor(private store: StoreService, private router: Router, private ngStore: Store) {}

    ngOnInit(): void {
        this.filters$ = this.ngStore.pipe(select(selectFilters));
        this.filterIdSubject = this.ngStore.pipe(select(selectFilterId));
        this.selectedProject$ = this.ngStore.pipe(select(selectProject));
    }

    public onMenuClick(id: number): void {
        this.ngStore.dispatch(menuClick({ filterId: id }));
        this.router.navigate(['/']);
    }

    public onNextPrevProjectClick(action: string): void {
        this.store.nextPrevProjectClick(action);
    }

    public goToLogin(): void {
        this.router.navigateByUrl('/login');
    }
}
