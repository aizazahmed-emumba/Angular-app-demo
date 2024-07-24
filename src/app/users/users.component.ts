import { Component, inject } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: false
})
export class UsersComponent {
  private usersService = inject(UsersService);
  users = this.usersService.users;
}
