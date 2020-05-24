import { Filter } from 'src/app/_model/filter.model';
import { Project } from 'src/app/_model/project.model';
import { createReducer, on } from '@ngrx/store';
import { GalleryActions } from '../action-types';

export interface GallaryState {
    filters: Filter[];
    projects: Project[];
    selectedProject: Project;
    selectedProjects: Project[];
    filterId: number;
}

export const initialGalleryState: GallaryState = {
    filters: null,
    projects: null,
    selectedProject: null,
    selectedProjects: null,
    filterId: null
};

export const galleryReducer = createReducer(
    initialGalleryState,

    on(GalleryActions.dataLoaded, (state, action) => ({
        filters: action.filters,
        projects: action.projects,
        selectedProject: null,
        selectedProjects: action.projects,
        filterId: null
    })),

    on(GalleryActions.menuClick, (state, action) => {
        let selProj =  state.projects;
        if (action.filterId) {
            selProj = state.projects.filter(pr => pr.filters.findIndex((el: number) => el === action.filterId) === -1 ? false : true);
        }

        return {
            filters: state.filters,
            projects: state.projects,
            selectedProject: null,
            selectedProjects: selProj,
            filterId: action.filterId
        };
    }),

    on(GalleryActions.projectClick, (state, action) => {
        return {
            filters: state.filters,
            projects: state.projects,
            selectedProject: JSON.parse(action.project),
            selectedProjects: null,
            filterId: null
        };
    })
);
