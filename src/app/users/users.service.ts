import { Injectable } from '@angular/core';

import { DUMMY_USERS } from '../../dummy-users';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = DUMMY_USERS;

  allUsers() {
    return [...this.users];
  }

  constructor() {
    const users = localStorage.getItem('users');

    if (users) {
      this.users = JSON.parse(users);
    }

  }

  getUserById(userId: string) {
    return this.users.find((user) => user.id === userId);
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.name === username);
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUsers();
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }


}
