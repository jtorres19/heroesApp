import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterModule, RouterStateSnapshot, Routes, UrlSegment } from '@angular/router';
import { Error404PageComponent } from "./shared/pages/error404-page/error404-page.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { PublicGuard } from "./auth/guards/public.guard";

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canMatch: [(route: Route, segments: UrlSegment[]) => inject(PublicGuard).matchPublicGuard(route, segments)],
        canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(PublicGuard).activatePublicGuard(route, state)],
    },
    {
        path: 'heroes',
        loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
        canMatch: [(route: Route, segments: UrlSegment[]) => inject(AuthGuard).authMatchGuard(route, segments)],
        canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).authActivateGuard(route, state)],
    },
    {
        path: '404',
        component: Error404PageComponent,
    },
    {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '404'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
