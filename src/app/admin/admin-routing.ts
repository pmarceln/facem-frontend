import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: 'categories', component: CategoriesComponent },
            { path: 'project/:id', component: ProjectComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: '**', component: AdminComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
