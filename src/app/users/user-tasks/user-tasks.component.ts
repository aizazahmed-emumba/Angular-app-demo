import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent implements OnInit, OnDestroy {

  userName: string | undefined;
  private subscribtion: any;


  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.subscribtion = this.activatedRoute.paramMap.subscribe((params) => {
      this.userName = this.usersService.users.find(user => user.id === params.get('userId')!)?.name;
    })
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
