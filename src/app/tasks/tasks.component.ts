import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task } from '../types/task.model';
import { combineLatest, merge, Subject, takeUntil } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  userId: string = 'dummy';
  private destroy$ = new Subject<void>();
  userTasks: Task[] = [];
  order?: 'des' | 'asc';
  constructor(private tasksService: TasksService, private activeRoute: ActivatedRoute, private cdRef: ChangeDetectorRef) {
  }




  ngOnInit(): void {

    const paramMap$ = this.activeRoute.parent?.paramMap;
    const queryParam$ = this.activeRoute.queryParams;

    if (paramMap$ && queryParam$) {
      combineLatest([paramMap$, queryParam$])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([paramMap, queryParams]) => {
          console.log('ParamMap:', paramMap);
          console.log('QueryParams:', queryParams);
          this.userId = paramMap.get('userId')!;
          this.order = queryParams['order'];
          this.loadUserTasks();
        });
    }


    
    this.tasksService.tasksChanged$.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadUserTasks();
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.tasksService.tasksLength$.next(this.userTasks.length);
    }
  }
}
