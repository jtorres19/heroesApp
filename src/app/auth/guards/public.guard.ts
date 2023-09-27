import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, tap } from "rxjs";


@Injectable({providedIn: "root"})
export class PublicGuard {
    constructor(private authService: AuthService, private router: Router) {}

    private checkAuthStatus() {
        return this.authService.checkAuth()
            .pipe(
                tap(isAuth => {
                    if (isAuth) this.router.navigate(['./'])

                    // if (!isAuth) this.router.navigate(['./auth/login'])
                }),
                map(isAuth => !isAuth)
            );
    }

    activatePublicGuard: CanActivateFn = (route, state) => {
        return this.checkAuthStatus();
    };

    matchPublicGuard: CanMatchFn = (route, segments) => {
        return this.checkAuthStatus();
    };
}


