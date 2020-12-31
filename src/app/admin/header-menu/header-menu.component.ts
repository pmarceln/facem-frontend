import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { logout } from '../../auth/auth.actions';


@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

    constructor(private router: Router, private store: Store<AppState>) {}

    ngOnInit(): void {}

    public goToGallery(): void {
        this.router.navigateByUrl('/');
    }

    public logOut(): void {
        this.store.dispatch(logout());
        this.goToGallery();
    }
}
