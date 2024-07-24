import { RouterModule, Routes } from "@angular/router";
import { TasksComponent } from "./tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "./new-task/new-task.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix'
    },
    {
        path: 'tasks',
        component: TasksComponent
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }