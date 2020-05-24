import { createAction, props } from '@ngrx/store';

import { Filter } from '../_model/filter.model';
import { Project } from '../_model/project.model';

export const loadData = createAction(
    '[App Load] Load Data'
);

export const dataLoaded = createAction(
    '[Load Data Effect] All Data Loaded',
    props<{ filters: Filter[], projects: Project[] }>()
);

export const menuClick = createAction(
    '[Menu Click] Filter Projects',
    props<{ filterId: number }>()
);

export const projectClick = createAction(
    '[Project Click] Gallery List',
    props<{ project: string }>()
);
