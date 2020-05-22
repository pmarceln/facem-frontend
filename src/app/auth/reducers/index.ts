import { ActionReducer, ActionReducerMap, createFeatureSelector, createReducer, createSelector, MetaReducer, on } from '@ngrx/store';
import { User } from '../_interface/user.interface';
import { AuthActions } from '../action-types';

export interface AuthState {
    user: User;
    token: string;
}

export const initialAuthState: AuthState = {
    user: undefined,
    token: undefined
};

export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.login, (state, action) => {
        return { user: action.user, token: action.token };
    }),

    on(AuthActions.logout, (state, action) => {
        return { user: undefined, token: undefined };
    })
);
