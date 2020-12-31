import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { logout } from '../auth/auth.actions';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

    constructor(private router: Router, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.router.navigateByUrl('/admin/categories');
    }
}
