import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Filter } from 'src/app/_model/filter.model';
import { StoreService } from 'src/app/_service/store.service';


@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

    public filters$: Observable<Filter[]>;
    public spinner$: Observable<boolean>;
    public showSpinner: boolean;
    public addEditFilter: Filter;

    constructor(private storeService: StoreService) {}

    ngOnInit(): void {
        this.filters$ = this.storeService.filter$;
        this.storeService.spinner$.subscribe(res => this.showSpinner = res);
        this.addEditFilter = new Filter();
    }

    public onEditClick(filter: Filter): void {
        this.addEditFilter = new Filter(filter.id, filter.name, filter.order, filter.is_active);
    }

    public onRemoveClick(filterId: number): void {
        if (confirm("Sigur doresti sa continui cu stergerea filtrului?")) {
            this.storeService.deleteFilter(filterId);
        }
    }

    public onIsActiveClick(filter: Filter): void {
        this.showSpinner = true;
        this.storeService.updateFilterActiveProperty(new Filter(filter.id, filter.name, filter.order, !filter.is_active));
    }

    public onResetSelectedFilterClick(): void {
        this.addEditFilter = new Filter();
    }

    public addFilter(): void {
        this.showSpinner = true;
        this.storeService.addEditFilter(this.addEditFilter);
    }
}
