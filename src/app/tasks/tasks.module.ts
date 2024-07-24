import { NgModule } from "@angular/core";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TasksComponent } from "./tasks.component";

import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CardComponent } from "../shared/card/card.component";
import { TasksRoutingModule } from "./tasks-routing.module";

@NgModule({
    declarations: [TaskComponent, TasksComponent, NewTaskComponent],
    exports: [TasksComponent],
    imports: [CommonModule, FormsModule, CardComponent, TasksRoutingModule],
    providers: [],
    bootstrap: []
})
export class TasksModule { }