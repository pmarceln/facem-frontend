import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule)
    },
    { path: 'login', component: LoginComponent },
    { path: '', loadChildren: () => import(`./gallery/gallery.module`).then(m => m.GalleryModule) },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
