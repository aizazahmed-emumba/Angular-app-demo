import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NoTaskComponent } from '../tasks/no-task/no-task.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { isLoggedIn, isAuthorized } from '../guards/auth-guards'
import { UserTasksComponent } from '../users/user-tasks/user-tasks.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [isLoggedIn],
        children: [
            {
                path: '',
                component: NoTaskComponent
            },
            {
                path: 'users/:userId',
                component: UserTasksComponent,
                loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule),
                canActivate: [isAuthorized]
            },
            {
                path: 'unauthorized',
                component: UnauthorizedComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
