import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
    declarations: [AdminComponent, HeaderMenuComponent, CategoriesComponent, ProjectsComponent],
    imports: [FormsModule, ReactiveFormsModule,CommonModule, AdminRoutingModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AdminModule {}
