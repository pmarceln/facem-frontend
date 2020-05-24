import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectProjects } from '../gallery.selectors';
import { GalleryActions } from '../action-types';

import { Project } from 'src/app/_model/project.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

    public project$: Observable<Project[]>;
    public showLogoIntro: boolean;

    constructor(private router: Router, private ngStore: Store) {}

    ngOnInit(): void {
        this.showLogoIntro = true;
        setTimeout(() => { this.showLogoIntro = false; }, 3000);
        this.project$ = this.ngStore.pipe(select(selectProjects));
    }

    public onMouseEnter(project: Project): void {
        // project.icon_active = project.icon_hover;
    }

    public onMouseLeave(project: Project): void {
        // project.icon_active = project.icon;
    }

    public onProjectClick(project: Project): void {
        this.ngStore.dispatch(GalleryActions.projectClick({ project: JSON.stringify(project) }));
        this.router.navigate(['project']);
    }
}
