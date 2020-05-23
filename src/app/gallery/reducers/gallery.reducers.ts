import { Filter } from 'src/app/_model/filter.model';
import { Project } from 'src/app/_model/project.model';
import { createReducer, on } from '@ngrx/store';
import { GalleryActions } from '../action-types';

export interface GallaryState {
    filters: Filter[];
    project: Project[];
}

export const initialGalleryState: GallaryState = {
    filters: undefined,
    project: undefined
};

export const galleryReducer = createReducer(
    initialGalleryState,

    on(GalleryActions.dataLoaded, (state, action) => ({ filters: action.filters, project: action.projects }))
);
