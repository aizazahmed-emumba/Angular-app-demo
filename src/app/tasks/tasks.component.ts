import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';
import { TaskComponent } from './task/task.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  userId: string = 'dummy';
  subscription = new Subscription();
  userTasks: Task[] = [];
  order?: 'asc' | 'des';
  constructor(private tasksService: TasksService, private activeRoute: ActivatedRoute, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const userIdSub = this.activeRoute.parent?.paramMap.subscribe(params => {
      this.userId = params.get('userId')!;
      this.loadUserTasks();
    });
    this.subscription.add(userIdSub);

    const tasksSub = this.tasksService.tasksChanged$.subscribe(() => {
      this.loadUserTasks();
    });
    this.subscription.add(tasksSub);

    const querySub = this.activeRoute.queryParams.subscribe(params => {
      this.order = params['order'];
      this.loadUserTasks();
      // this.cdRef.markForCheck();
    })
    this.subscription.add(querySub)

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  private loadUserTasks() {
    console.log('loadUserTasks');
    if (this.userId) {
      this.userTasks = this.tasksService.allTasks().filter(task => task.userId === this.userId).sort((a, b) => {
        if (this.order === 'des') {
          return a.id > b.id ? 1 : -1;
        } else {
          return a.id < b.id ? 1 : -1;
        }
      })

    }
  }
}
