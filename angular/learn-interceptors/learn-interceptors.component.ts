import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-interceptors',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-interceptors.component.html',
  styleUrl: './learn-interceptors.component.scss'
})
export class LearnInterceptorsComponent implements AfterViewChecked{
  code: string = `
  import { Injectable } from '@angular/core';
  import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';

  @Injectable()
  export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('Request made to:', req.url);
      
      return next.handle(req).pipe(
        tap(
          event => {
            console.log('Response received:', event);
          },
          error => {
            console.error('Request error:', error);
          }
        )
      );
    }
  }

  `;

  registering: string = `
  import { NgModule } from '@angular/core';
  import { HTTP_INTERCEPTORS } from '@angular/common/http';
  import { MyInterceptor } from './my-interceptor';

  @NgModule({
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MyInterceptor,
        multi: true // Allows multiple interceptors
      }
    ]
  })
  export class AppModule { }
  `;

  auth: string = `
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', \`Bearer \${this.authService.getToken()}\`)
      });
      return next.handle(authReq);
    }
    `;

  error: string = `
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error
        return throwError(error);
      })
    );
  }
  `;

  log: string = `
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request:', req);
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('Response:', event);
        }
      })
    );
  }
  `;

  cache: string = `
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedResponse = this.cacheService.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req.url, event);
        }
      })
    );
  }
  `;

  order: string = `
    providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FirstInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecondInterceptor,
      multi: true
    }
  ]
  `;
    
  @ViewChild('codeElement') codeElement!: ElementRef;
  
   ngAfterViewChecked() {
      Prism.highlightAll();
    }
}