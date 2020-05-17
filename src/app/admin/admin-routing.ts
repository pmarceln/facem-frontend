import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            // { path: '', component: ListComponent },
            // { path: 'project', component: ProjectComponent },
            // { path: '**', component: ListComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
