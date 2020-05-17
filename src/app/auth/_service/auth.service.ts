import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_interface/user.interface';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    public login(email: string, password: string): Observable<User> {
        return this.http.post<User>('http://api.facem.graphics/api/login', { email, password });
    }
}
