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

    constructor(private storeService: StoreService) {}

    ngOnInit(): void {
        this.filters$ = this.storeService.filter$;
        this.storeService.spinner$.subscribe(res => this.showSpinner = res);
    }

    public addCategory(): void {

    }

    public onIsActiveClick(filter: Filter): void {
        this.showSpinner = true;
        this.storeService.updateFilterActiveProperty(new Filter(filter.id, filter.name, filter.order, !filter.is_active));
    }
}
