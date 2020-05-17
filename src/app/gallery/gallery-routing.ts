import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from './gallery.component';
import { ListComponent } from './list/list.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
    {
        path: '', component: GalleryComponent, children: [
            { path: '', component: ListComponent },
            { path: 'project', component: ProjectComponent },
            { path: '**', component: ListComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GalleryRoutingModule {}
