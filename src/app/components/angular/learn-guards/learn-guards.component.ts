import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-guards',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-guards.component.html',
  styleUrl: './learn-guards.component.scss'
})
export class LearnGuardsComponent implements AfterViewChecked{
  code: string = `
  import { Injectable } from '@angular/core';
  import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { AuthService } from './auth.service';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

  `;

  activate: string = `
  import { Injectable } from '@angular/core';
  import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
  import { AuthService } from './auth.service';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
  `;

  activateChild: string = `
    import { Injectable } from '@angular/core';
    import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
    import { AuthService } from './auth.service';

    @Injectable({
      providedIn: 'root'
    })
    export class AuthGuard implements CanActivateChild {
      constructor(private authService: AuthService, private router: Router) {}

      canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): boolean {
        if (this.authService.isLoggedIn()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
    }
  `;

  deactivate: string = `
  import { Injectable } from '@angular/core';
  import { CanDeactivate } from '@angular/router';
  import { Observable } from 'rxjs';

  export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(
      component: CanComponentDeactivate
    ): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate ? component.canDeactivate() : true;
    }
  }
  `;

  resolve: string = `
  import { Injectable } from '@angular/core';
  import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
  import { Observable } from 'rxjs';
  import { DataService } from './data.service';

  @Injectable({
    providedIn: 'root'
  })
  export class DataResolver implements Resolve<any> {
    constructor(private dataService: DataService) {}

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<any> {
      return this.dataService.getData();
    }
  }
  `;

  load: string = `
  import { Injectable } from '@angular/core';
  import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
  import { AuthService } from './auth.service';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class CanLoadGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(
      route: Route,
      segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
  `;

  registerGuard: string = `
    const routes: Routes = [
    {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      canDeactivate: [CanDeactivateGuard],
      resolve: { data: DataResolver },
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      canLoad: [CanLoadGuard]
    }
  ];
  `;
  
  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}