import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectProject } from '../gallery.selectors';

import { Project } from 'src/app/_model/project.model';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

    public project$: Observable<Project>;

    constructor(private ngStore: Store) { }

    ngOnInit(): void {
        this.project$ = this.ngStore.pipe(select(selectProject));
    }
}
