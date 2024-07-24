import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";
import { MainComponent } from "./main/main.component";
import { AuthService } from "./auth/auth.service";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";


const isLoggedIn: CanActivateFn = (route, state) => {

    const router = inject(Router);
    const authService = inject(AuthService);

    if (!authService.loggedIn) {
        console.log('Access denied');
        return new RedirectCommand(router.parseUrl('/login'));
    }
    return true;
};

const isAuthorized: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userId = route.paramMap.get('userId');
    if (authService.loggedUser?.id !== userId) {
        console.log('Access denied');
        return router.parseUrl('/unauthorized')
    }
    return true;
};

export const routes: Routes = [
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
                canActivate: [isAuthorized],
                loadChildren: () => import("./users/user.routes").then(mod => mod.userRoutes)
            },
            {
                path: 'unauthorized',
                component: UnauthorizedComponent
            },
            // {
            //     path: '**',
            //     component: NotFoundComponent
            // }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import("./auth/login/login.component").then(mod => mod.LoginComponent)
    },
    {
        path: 'signUp',
        loadComponent: () => import("./auth/signup/signup.component").then(mod => mod.SignupComponent),
    }
]