import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment
} from '@angular/router';
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}

    private checkAuthStatus() {
        return this.authService.checkAuth()
            .pipe(
                tap(isAuth => {
                    if (!isAuth) this.router.navigate(['./auth/login'])
                })
            );
    }

    authActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return this.checkAuthStatus();
    };

    authMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
        return this.checkAuthStatus();
    };
}
