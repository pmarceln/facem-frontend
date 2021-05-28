import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
    declarations: [AdminComponent, HeaderMenuComponent, CategoriesComponent, ProjectsComponent, ProjectComponent],
    imports: [FormsModule, ReactiveFormsModule,CommonModule, AdminRoutingModule, MatCheckboxModule, MatProgressSpinnerModule, MatSelectModule, MatExpansionModule],
})
export class AdminModule {}
