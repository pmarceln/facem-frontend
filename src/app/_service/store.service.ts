import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { FilterInterface } from '../_interface/filter.interface';
import { ProjectInterface } from '../_interface/project.interface';
import { Filter } from '../_model/filter.model';
import { Project } from '../_model/project.model';
import { Photo } from '../_model/photo.model';

@Injectable({ providedIn: 'root' })
export class StoreService {

    private filtersSubject: BehaviorSubject<Filter[]> =  new BehaviorSubject([]);
    private projectsSubject: BehaviorSubject<Project[]> =  new BehaviorSubject([]);
    private spinnerSubject: BehaviorSubject<boolean> =  new BehaviorSubject(false);
    public project$: Observable<Project[]> = this.projectsSubject.asObservable();
    public filter$: Observable<Filter[]> = this.filtersSubject.asObservable();
    public spinner$: Observable<boolean> = this.spinnerSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    public getAllData(): Observable<{ filters: Filter[], projects: Project[] }> {
        return this.httpClient.get('https://api.facem.graphics/api/getallData').pipe(
            map(
                (data: { filters: FilterInterface[], projects: ProjectInterface[] }) => {
                    const filters = [];
                    const projects = [];
                    data.filters.forEach((el: Filter) => filters.push(new Filter(el.id, el.name, el.order, el.is_active ? true : false)));
                    data.projects.forEach(
                        (el: Project) => {
                            const photos = [];
                            el.photos.forEach(
                                (element: Photo) => {
                                    const photo = 'https://api.facem.graphics/uploads/' + element.photo;
                                    photos.push(new Photo(element.id, element.idproject, element.order, photo, element.description));
                                }
                            );
                            const icon = 'https://api.facem.graphics/uploads/' + el.icon;
                            const iconHover = 'https://api.facem.graphics/uploads/' + el.icon_hover;
                            const digits = el.filters.split(',');
                            projects.push(new Project(digits.map(Number), icon, iconHover, icon, el.id, el.name, el.order, photos, el.is_active));
                        }
                    );
                    this.filtersSubject.next(filters);
                    this.projectsSubject.next(projects);

                    return { filters, projects };
                }
            )
        );
    }
    // public filterProjects(id: number): Observable<Project[]> {
    //     return this.project$.pipe(
    //         map((proj: Project[]) => proj.filter((pr: Project) => pr.filters.findIndex((el: number) => el === id) === -1 ? false : true))
    //     );
    // }

    // public selectProject(project: Project): void {
    //     this.selectedProjectSubject.next(project);
    // }

    public nextPrevProjectClick(action: string): void {
        // const selectedProjectId = this.selectedProjectSubject.getValue().id;
        // const projects = this.projectsSubject.getValue();
        // let index = projects.findIndex( (el: Project) => el.id === selectedProjectId);
        // if (index !== -1) {
        //     index = (action === 'next') ? index++ : index--;
        //     if ((action === 'next')) {
        //         index += 1;
        //     } else {
        //         index += 1;
        //     }

        //     if (index < 0) {
        //         index = projects.length - 1;
        //     }
        //     if (index > projects.length - 1) {
        //         index = 0;
        //     }

        //     this.selectedProjectSubject.next(projects[index]);
        // }
    }

    public updateFilterActiveProperty(filter: any): void {
        filter.is_active = filter.is_active ? 1 : 0;
        this.httpClient.post('http://api.facem.graphics/api/filterIsActive', { filter }).subscribe(
            (filter: Filter) => {
                let filters = this.filtersSubject.getValue();
                let newFilters = JSON.parse(JSON.stringify(filters));
                let index = newFilters.findIndex(el => el.id === filter.id);
                newFilters[index].is_active = filter.is_active ? true : false;
                this.filtersSubject.next(newFilters);
                this.spinnerSubject.next(false);
            },
            error => console.log(error)
        );
    }

    public updateProjectActiveProperty(projectId: any, isActive: boolean): void {
        console.log(projectId, isActive);
        const is_active = isActive ? 1 : 0;
        this.httpClient.post('http://api.facem.graphics/api/projectIsActive', { project : { id: projectId, is_active: is_active} }).subscribe(
            (response) => {
                console.log(response);
                let projects = this.projectsSubject.getValue();
                let newProjects = JSON.parse(JSON.stringify(projects));
                let index = newProjects.findIndex(el => el.id === projectId);
                newProjects[index].is_active = isActive;
                this.projectsSubject.next(newProjects);
                this.spinnerSubject.next(false);
            },
            error => console.log(error)
        );
    }

    public addEditFilter(filter: any): void {
        filter.is_active = filter.is_active ? 1 : 0;
        this.httpClient.post('http://api.facem.graphics/api/addEditFilter', { filter }).subscribe(
            (fil: Filter) => {
                fil.is_active = filter.is_active ? true : false;
                let filters = this.filtersSubject.getValue();
                let newFilters = JSON.parse(JSON.stringify(filters));
                if (filter.id) {
                    let index = newFilters.findIndex(el => el.id === filter.id);
                    newFilters[index].name = fil.name;
                } else {
                    newFilters.push(filter);
                }

                this.filtersSubject.next(newFilters);
                this.spinnerSubject.next(false);
            },
            error => console.log(error)
        );
    }

    public deleteFilter(id: number): void {
        this.httpClient.post('http://api.facem.graphics/api/deleteFilter', { id }).subscribe(
            () => {
                let filters = this.filtersSubject.getValue();
                let newFilters = JSON.parse(JSON.stringify(filters));
                let index = newFilters.findIndex(el => el.id === id);
                if (index !== -1) {
                    newFilters.splice(index, 1);
                    this.filtersSubject.next(newFilters);
                }
                this.spinnerSubject.next(false);
            },
            error => {
                console.log(error)
                this.spinnerSubject.next(false);
            }
        );
    }

    public addProject(project: any): Observable<any> {
        return this.httpClient.post('http://api.facem.graphics/api/addProject', { project }).pipe(
            map( (project: any) => {
                console.log(project);
                const projects = JSON.stringify(this.projectsSubject.getValue());
                const newProjects =  JSON.parse(projects);
                const index = newProjects.findIndex((el: Project) => el.id === project.id);
                if (index === -1) {
                    newProjects.push(new Project(0, 'https://api.facem.graphics/uploads/' + project.icon, 'https://api.facem.graphics/uploads/' + project.icon_hover, 'https://api.facem.graphics/uploads/' + project.icon, project.id, project.name, project.order, []));
                } else {
                    newProjects[index].name = project.name;
                    newProjects[index].icon = 'https://api.facem.graphics/uploads/' + project.icon;
                    newProjects[index].icon_active = 'https://api.facem.graphics/uploads/' + project.icon;
                }
                this.projectsSubject.next(newProjects);

                return project;
            })
        );
    }

    public saveProject(project: any): Observable<any> {
        return this.httpClient.post('http://api.facem.graphics/api/editProject', { project }).pipe(
            map( (project: any) => {
                console.log(project);
                // const projects = JSON.stringify(this.projectsSubject.getValue());
                // const newProjects =  JSON.parse(projects);
                // const index = newProjects.findIndex((el: Project) => el.id === project.id);
                // if (index === -1) {
                //     newProjects.push(new Project(0, 'https://api.facem.graphics/uploads/' + project.icon, 'https://api.facem.graphics/uploads/' + project.icon_hover, 'https://api.facem.graphics/uploads/' + project.icon, project.id, project.name, project.order, []));
                // } else {
                //     newProjects[index].name = project.name;
                //     newProjects[index].icon = 'https://api.facem.graphics/uploads/' + project.icon;
                //     newProjects[index].icon_active = 'https://api.facem.graphics/uploads/' + project.icon;
                // }
                // this.projectsSubject.next(newProjects);

                return project;
            })
        );
    }

    public updateProjectPhotosDescriptionAndOrder(data: any): Observable<any> {
        return this.httpClient.post('http://api.facem.graphics/api/updateProjectPhotosDescriptionAndOrder', data).pipe(
            map( (data: any) => {
                return data;
            })
        );
    }

    public getProjectById(id: number) {
        const projects = this.projectsSubject.getValue();
        const index = projects.findIndex((el: Project) => el.id === id);
        const project = JSON.stringify(projects[index]);

        return JSON.parse(project);
    }
}
