import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: false
})
export class UsersComponent implements OnInit, OnDestroy {

  subscribtion = new Subscription();

  constructor(private usersService: UsersService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    const sub = this.httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (users: any) => {
        console.log(users);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    })
    this.subscribtion.add(sub);
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }



  users = this.usersService.users;


}
