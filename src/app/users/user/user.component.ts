import { Component, computed, input, OnInit } from '@angular/core';
import { type User } from '../../types/user.model';
import { TasksService } from '../../services/tasks.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: false
})
export class UserComponent implements OnInit {
  user = input.required<User>();
  tasksLength = 0;
  imagePath = computed(() => 'users/' + this.user().avatar);

  constructor(private tasksService: TasksService) { }


  ngOnInit(): void {
    this.tasksService.tasksLength$.subscribe(length => {
      this.tasksLength = length;
    })
  }

}
