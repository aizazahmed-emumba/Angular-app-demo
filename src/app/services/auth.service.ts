import { Injectable } from '@angular/core';
import { User } from '../types/user.model';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    loggedIn = false;
    loggedUser: User | null = null;

    constructor(private userService: UsersService) {
        this.getLoggedInUserFromStoreAge();
    }

    private getLoggedInUserFromStoreAge() {
        const user = localStorage.getItem('user');
        if (user) {
            this.loggedUser = JSON.parse(user);
            this.loggedIn = true;
        }
    }


    login(username: string, password: string): boolean {
        const user = this.userService.getUserByUsername(username);
        if (user && user.password === password) {
            this.loggedUser = user;
            this.loggedIn = true;
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }

        return false;
    }


    logout() {
        this.loggedIn = false;
        this.loggedUser = null;
        localStorage.removeItem('user');
    }


    signUp(name: string, password: string): boolean {
        const user: User = {
            name,
            password,
            id: Math.random().toString(),
            avatar: 'user-4.jpg'
        }

        this.userService.addUser(user);
        return true;
    }

}
