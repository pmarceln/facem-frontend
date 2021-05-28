import { Component, OnInit } from '@angular/core';
import { noop, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Project } from 'src/app/_model/project.model';
import { StoreService } from 'src/app/_service/store.service';
import { Filter } from 'src/app/_model/filter.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {

    public spinner$: Observable<boolean>;
    public project$: Observable<Project[]>
    public showSpinner: boolean;
    public project: Project;
    public newPrjIcons: (string | ArrayBuffer)[];
    public newProjectName: string;
    public filter$: Observable<Filter[]>
    public filters = new FormControl();
    public projectFilters: string;

    constructor(private storeService: StoreService) {}

    ngOnInit(): void {
        this.filter$ = this.storeService.filter$;
        this.project$ = this.storeService.project$;
        this.project = new Project();
        this.newPrjIcons = [];
        this.projectFilters = '';
        this.storeService.spinner$.subscribe(res => this.showSpinner = res);
    }

    public addProject(): void {
        const newProject = { name: this.newProjectName, icon_active: this.newPrjIcons[0], icon_hover: this.newPrjIcons[1], filters: this.projectFilters };
        this.storeService.addProject(newProject).subscribe(noop,(error) => console.log(error));
        this.newPrjIcons = [];
        this.newProjectName = '';
    }

    public uploadFile(file, type: number) {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = () => { this.newPrjIcons[type] = reader.result; };
        reader.onerror = (error) => { console.log('Error: ', error); };
    }

    public onFilterChange(event: MatSelectChange):void {
        this.projectFilters = event.value.join(',');
    }

    public onIsActiveClick(projectId: number, isActive: boolean): void {
        this.showSpinner = true;
        this.storeService.updateProjectActiveProperty(projectId, !isActive);
    }
}
