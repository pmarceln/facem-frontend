import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from 'src/app/_model/project.model';
import { StoreService } from 'src/app/_service/store.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

    public selectedProject: Project;

    constructor(private store: StoreService, private router: Router) {}

    ngOnInit(): void {
        this.store.selectedProject$.subscribe(
            (project: Project) => {
                if (project === null) {
                    this.router.navigate(['/']);
                }
                this.selectedProject = project;
            }
        );
    }
}
