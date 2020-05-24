
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { GalleryEffects } from './gallery.effects';
import { StoreModule } from '@ngrx/store';
import { galleryReducer } from './reducers/gallery.reducers';
import { GalleryRoutingModule } from './gallery-routing';

import { GalleryComponent } from './gallery.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectGuard } from '../auth/project-guard';

@NgModule({
    declarations: [GalleryComponent, HeaderComponent, ListComponent, ProjectComponent],
    imports: [
        CommonModule,
        GalleryRoutingModule,
        EffectsModule.forFeature([GalleryEffects]),
        StoreModule.forFeature('gallery', galleryReducer)
    ],
    providers: [ProjectGuard]
})
export class GalleryModule {}
