import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Filter } from 'src/app/_model/filter.model';
import { ProjectImage } from 'src/app/_model/projectimage.model';
import { StoreService } from 'src/app/_service/store.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

    public project$: Observable<any>;
    public projectId: number;
    public projectImages: ProjectImage[];
    public filter$: Observable<Filter[]>
    public filters = new FormControl();
    public projectFilters: string;
    public selectedFilters = [];
    public coverImages: (string | ArrayBuffer)[];
    public projectName: string;
    public projectPhotosDescriptionAndOrder: any;

    constructor(private route: ActivatedRoute, private storeService: StoreService) {}

    ngOnInit(): void {
        this.projectFilters = '';
        this.coverImages = [];
        this.filter$ = this.storeService.filter$;
        this.project$ = this.route.paramMap.pipe(
            map((params) => {
                this.projectId = Number(params.get('id'));
                const project = this.storeService.getProjectById(this.projectId);
                this.selectedFilters = project.filters;
                this.projectName = project.name;
                this.projectFilters = project.filters.join(',');
                console.log(project);
                this.projectPhotosDescriptionAndOrder = project.photos.map( el => { return { description: el.description, order: el.order, id: el.id } } );
                return project;
            })
        );
        this.projectImages = [new ProjectImage()];
    }

    public uploadFileCover(file, type: number) {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = () => { this.coverImages[type] = reader.result; };
        reader.onerror = (error) => { console.log('Error: ', error); };
    }

    public addProjectImage(): void {
        this.projectImages.push(new ProjectImage());
    }

    public uploadFile(file, index: number) {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = () => { this.projectImages[index].image = reader.result; };

        reader.onerror = (error) => { console.log('Error: ', error); };
    }

    public saveProject(): void {

        let toEliminate = [];
        for (let index = 0; index < this.projectImages.length; index++) {
            const element = this.projectImages[index];
            if (!element.image) {
                toEliminate.push(index);
            }
        }
        if (toEliminate.length > 0) {
            for (let index = toEliminate.length - 1; index >= 0; index--) {
                const element = toEliminate[index];
                this.projectImages.splice(element, 1);
            }
        }

        const editProject = {
            id: this.projectId,
            name: this.projectName,
            icon_active: this.coverImages[0],
            icon_hover: this.coverImages[1],
            prjImg: this.projectImages,
            filters: this.projectFilters
        };
        this.storeService.saveProject(editProject).subscribe( (res) => { }, (error) => console.log(error));

        this.projectImages = [new ProjectImage()];
    }

    public saveImagesOrderAndDescription(): void {
        this.storeService.updateProjectPhotosDescriptionAndOrder({projectPhotosDescriptionAndOrder: this.projectPhotosDescriptionAndOrder}).subscribe( (res) => { }, (error) => console.log(error));
    }

    public onFilterChange(event: MatSelectChange):void {
        this.projectFilters = event.value.join(',');
    }
}
