import { Component, inject, input, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { ActivatedRoute, CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent implements OnInit {

  userId: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.activatedRoute.parent?.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
    })
  }

  enteredTitle: string = "";
  enteredSummary: string = '';
  enteredDate: string = '';
  submitted = false;
  private tasksService = inject(TasksService);



  onSubmit() {

    console.log(this.userId)
    if (!this.userId) {
      return;
    }
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: this.enteredDate,
      },
      this.userId
    );
    this.submitted = true;
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}


export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {

  if ((component.enteredTitle !== '' || component.enteredSummary !== '' || component.enteredDate !== '') && !component.submitted) {
    return confirm('Do you want to discard the changes?');
  }
  return true;
}
