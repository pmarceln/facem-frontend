import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/_service/store.service';
import { Observable, BehaviorSubject } from 'rxjs';

import { Filter } from 'src/app/_model/filter.model';
import { Project } from 'src/app/_model/project.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    public filters$: Observable<Filter[]>;
    public filterIdSubject: BehaviorSubject<number>;
    public selectedProject$: Observable<Project>;

    constructor(private store: StoreService, private router: Router) {}

    ngOnInit(): void {
        this.selectedProject$ = this.store.selectedProject$;
        this.filters$ = this.store.filters$;
        this.filterIdSubject = this.store.filterIdSubject;
    }

    public onMenuClick(id: number): void {
        this.filterIdSubject.next(id);
        this.router.navigate(['/']);
        if (id === null) {
            this.store.selectProject(null);
        }
    }

    public onNextPrevProjectClick(action: string): void {
        this.store.nextPrevProjectClick(action);
    }

    public goToLogin(): void {
        this.router.navigateByUrl('/login');
    }
}
