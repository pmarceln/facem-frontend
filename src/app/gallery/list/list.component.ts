import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { StoreService } from 'src/app/_service/store.service';

import { Project } from 'src/app/_model/project.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

    public project$: Observable<Project[]>;
    public filterIdSubject: BehaviorSubject<number>;
    public showLogoIntro: boolean;

    constructor(private store: StoreService, private router: Router) {}

    ngOnInit(): void {
        this.showLogoIntro = true;
        setTimeout(() => { this.showLogoIntro = false; }, 3000);
        this.filterIdSubject = this.store.filterIdSubject;
        this.store.filterIdSubject.subscribe(
            (id: number) => {
                this.project$ = id ? this.store.filterProjects(id) : this.store.project$;
            }
        );
    }

    public onMouseEnter(project: Project): void {
        project.icon_active = project.icon_hover;
    }

    public onMouseLeave(project: Project): void {
        project.icon_active = project.icon;
    }

    public onProjectClick(project: Project): void {
        this.store.selectProject(project);
        this.router.navigate(['project']);
        this.filterIdSubject.next(null);
    }
}
