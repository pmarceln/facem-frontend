import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GallaryState } from './reducers/gallery.reducers';

export const selectGallaryState = createFeatureSelector<GallaryState>('gallery');

export const selectFilters = createSelector(selectGallaryState, state => state.filters);

export const selectProjects = createSelector(selectGallaryState, state => state.selectedProjects);

export const selectProject = createSelector(selectGallaryState, state => state.selectedProject);

export const selectFilterId = createSelector(selectGallaryState, state => state.filterId);

export const selectHasData = createSelector(selectGallaryState, state => (state.projects) ? true : false);

export const isProjectSelected = createSelector(selectGallaryState, (gallery) => !!gallery.selectedProject);
