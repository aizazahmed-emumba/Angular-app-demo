import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
// import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  userTasksLength: number = 0
  constructor(private tasksService: TasksService) {
    tasksService.tasksLength$.subscribe(length => {
      this.userTasksLength = length;
    })
  }

}
