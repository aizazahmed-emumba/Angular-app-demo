import { Injectable, signal } from '@angular/core';

import { Task, type NewTaskData } from '../types/task.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {


  tasksChanged$ = new Subject<void>(); // change to subject
  tasksLength$ = new BehaviorSubject<number>(0);

  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  allTasks() {
    return [...this.tasks];
  }

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  addTask(taskData: NewTaskData, userId: string) {

    const newTask: Task = {
      id: Math.random().toString(),
      userId,
      ...taskData,
    };

    this.tasks.push(newTask);

    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.tasksChanged$.next();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
