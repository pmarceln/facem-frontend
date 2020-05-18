import { createAction, props } from '@ngrx/store';
import { User } from './_interface/user.interface';

export const login = createAction(
    '[Login Page] User Login',
    props<{ user: User, token: string }>()
);

export const logout = createAction(
    '[Top Right] User Logout'
);
