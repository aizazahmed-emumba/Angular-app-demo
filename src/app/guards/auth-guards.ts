import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const isLoggedIn: CanActivateFn = (route, state) => {

    const router = inject(Router);
    const authService = inject(AuthService);

    if (!authService.loggedIn) {
        console.log('Access denied');
        return new RedirectCommand(router.parseUrl('/login'));
    }
    return true;
};

export const isAuthorized: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userId = route.paramMap.get('userId');
    if (authService.loggedUser?.id !== userId) {
        console.log('Access denied');
        return router.parseUrl('/unauthorized')
    }
    return true;
};
