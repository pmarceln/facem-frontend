
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GalleryRoutingModule } from './gallery-routing';
import { GalleryComponent } from './gallery.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
    declarations: [GalleryComponent, HeaderComponent, ListComponent, ProjectComponent],
    imports: [CommonModule, GalleryRoutingModule],
    providers: []
})
export class GalleryModule {}
