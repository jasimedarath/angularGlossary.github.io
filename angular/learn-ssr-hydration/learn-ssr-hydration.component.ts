import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-ssr-hydration',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-ssr-hydration.component.html',
  styleUrl: './learn-ssr-hydration.component.scss',
})
export class LearnSsrHydrationComponent implements AfterViewChecked {
  basicSSR: string = `// Enable SSR in Angular 17+
// 1. Add SSR during project creation
ng new my-app --ssr

// 2. Or add to existing project
ng add @angular/ssr

// angular.json configuration
{
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:application",
      "options": {
        "browser": "src/main.ts",
        "server": "src/main.server.ts",
        "prerender": true,
        "ssr": {
          "entry": "server.ts"
        }
      }
    }
  }
}`;

  hydration: string = `// main.ts - Enable hydration
import { bootstrapApplication } from '@angular/platform-browser';
import { provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(), // Enable hydration
    // other providers...
  ]
});

// What hydration does:
// 1. Server renders HTML
// 2. HTML sent to browser
// 3. Angular attaches to existing DOM (no re-render)
// 4. Event listeners added
// 5. Full interactivity restored

// Benefits:
// - Faster First Contentful Paint (FCP)
// - Improved Largest Contentful Paint (LCP)
// - Better SEO
// - No content flashing
// - Reduced bandwidth usage`;

  platformCheck: string = `// Check if code is running on server or browser
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-geo-location',
  template: \`
    @if (location) {
      <div>Your location: {{ location.lat }}, {{ location.lng }}</div>
    }
  \`
})
export class GeoLocationComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  location: { lat: number; lng: number } | null = null;
  
  ngOnInit() {
    // Only access browser APIs on the browser
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        }
      );
    }
  }
}

// Common platform-specific scenarios
@Component({...})
export class PlatformAwareComponent {
  private platformId = inject(PLATFORM_ID);
  
  ngOnInit() {
    // Browser-only: DOM manipulation
    if (isPlatformBrowser(this.platformId)) {
      this.initChartLibrary();
      localStorage.setItem('key', 'value');
      window.addEventListener('scroll', this.onScroll);
    }
    
    // Server-only: Different rendering
    if (isPlatformServer(this.platformId)) {
      // Use placeholder data or server-specific logic
      this.loadDataForSEO();
    }
  }
}`;

  transferState: string = `// Transfer data from server to browser
import { TransferState, makeStateKey } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const USERS_KEY = makeStateKey<User[]>('users');

@Component({
  selector: 'app-user-list',
  template: \`
    @for (user of users; track user.id) {
      <div>{{ user.name }}</div>
    }
  \`
})
export class UserListComponent implements OnInit {
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  
  users: User[] = [];
  
  ngOnInit() {
    // Check if data is already available from server
    const cachedUsers = this.transferState.get(USERS_KEY, null);
    
    if (cachedUsers) {
      // Use cached data (browser after SSR)
      this.users = cachedUsers;
    } else {
      // Fetch data
      this.http.get<User[]>('/api/users').subscribe(users => {
        this.users = users;
        
        // On server, save data for transfer to browser
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(USERS_KEY, users);
        }
      });
    }
  }
}

// Using with HttpClient interceptor
import { HttpInterceptorFn } from '@angular/common/http';

export const transferStateInterceptor: HttpInterceptorFn = (req, next) => {
  const transferState = inject(TransferState);
  const platformId = inject(PLATFORM_ID);
  
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }
  
  const key = makeStateKey(req.url);
  
  // On browser, check if data was transferred from server
  if (isPlatformBrowser(platformId)) {
    const cachedResponse = transferState.get(key, null);
    if (cachedResponse) {
      transferState.remove(key);
      return of(new HttpResponse({ body: cachedResponse }));
    }
  }
  
  // Make request and cache on server
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse && isPlatformServer(platformId)) {
        transferState.set(key, event.body);
      }
    })
  );
};`;

  ssrOptimization: string = `// Optimize SSR performance

// 1. Use deferrable views for non-critical content
@Component({
  template: \`
    <!-- Critical content renders on server -->
    <app-header />
    <app-hero />
    
    <!-- Defer heavy components -->
    @defer (on idle) {
      <app-recommendations />
    } @placeholder {
      <div class="skeleton"></div>
    }
  \`
})
export class PageComponent {}

// 2. Prerender static routes
// angular.json
{
  "architect": {
    "build": {
      "options": {
        "prerender": true,
        "prerenderRoutes": [
          "/",
          "/about",
          "/contact",
          "/products"
        ]
      }
    }
  }
}

// 3. Configure SSR timeout
// server.ts
const server = app();
server.set('view engine', 'html');
server.set('views', DIST_FOLDER);

server.get('*', (req, res) => {
  res.render('index', {
    req,
    providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl },
      {
        provide: 'serverUrl',
        useValue: \`\${req.protocol}://\${req.get('host')}\`
      }
    ]
  }, {
    timeout: 10000 // 10 second timeout
  });
});

// 4. Lazy load routes
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
  }
];`;

  nonDestructiveHydration: string = `// Non-destructive hydration (Angular 16+)
// Prevents content flickering and preserves server-rendered content

// main.ts
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(
      // Replay events that occurred before hydration completed
      withEventReplay()
    ),
  ]
});

// How it works:
// 1. Server renders HTML
// 2. HTML sent to browser with hydration metadata
// 3. Browser displays content immediately (FCP)
// 4. Angular downloads and bootstraps
// 5. Angular "hydrates" existing DOM instead of destroying it
// 6. Event listeners attached
// 7. User events that occurred during hydration are replayed

// Benefits:
// - No DOM re-render (no flickering)
// - Preserves focus and scroll position
// - Better performance
// - Improved user experience
// - SEO-friendly content remains visible

// Common issues and solutions:
@Component({
  template: \`
    <!-- ❌ Avoid: Direct DOM manipulation conflicts with hydration -->
    <div #myDiv></div>
    
    <!-- ✅ Use: Angular's template syntax -->
    @if (showContent) {
      <div>Content</div>
    }
  \`
})
export class HydrationFriendlyComponent {
  // ❌ Avoid: Accessing ViewChild before hydration
  @ViewChild('myDiv') myDiv!: ElementRef;
  
  ngOnInit() {
    // This might run before hydration completes
    // this.myDiv.nativeElement.innerHTML = 'content';
  }
  
  // ✅ Use: AfterViewInit for DOM access
  ngAfterViewInit() {
    // Safe to access DOM here
    if (this.myDiv) {
      // DOM operations here
    }
  }
}`;

  realWorldSSR: string = `// Complete SSR setup example

// 1. app.config.ts - Application configuration
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { transferStateInterceptor } from './interceptors/transfer-state.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // Use fetch API for SSR
      withInterceptors([transferStateInterceptor])
    ),
    provideClientHydration(
      withEventReplay() // Replay user events during hydration
    ),
  ]
};

// 2. app.config.server.ts - Server-specific configuration
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

// 3. Component with SSR optimizations
@Component({
  selector: 'app-product-page',
  template: \`
    <!-- Critical content (SSR) -->
    <app-header />
    <div class="product-hero">
      <h1>{{ product()?.name }}</h1>
      <img [src]="product()?.image" [alt]="product()?.name" />
      <p>{{ product()?.description }}</p>
      <button (click)="addToCart()">Add to Cart</button>
    </div>
    
    <!-- Defer non-critical content -->
    @defer (on viewport; prefetch on idle) {
      <app-reviews [productId]="productId()" />
    } @placeholder {
      <div class="reviews-skeleton"></div>
    }
    
    @defer (on idle) {
      <app-related-products [category]="product()?.category" />
    }
    
    <!-- Browser-only features -->
    @if (isBrowser()) {
      <app-recently-viewed />
    }
  \`
})
export class ProductPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private transferState = inject(TransferState);
  private http = inject(HttpClient);
  
  productId = toSignal(this.route.params.pipe(map(p => p['id'])));
  product = signal<Product | null>(null);
  
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  
  ngOnInit() {
    const id = this.productId();
    if (!id) return;
    
    const key = makeStateKey<Product>(\`product-\${id}\`);
    const cached = this.transferState.get(key, null);
    
    if (cached) {
      this.product.set(cached);
    } else {
      this.http.get<Product>(\`/api/products/\${id}\`).subscribe(product => {
        this.product.set(product);
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(key, product);
        }
      });
    }
  }
}`;

  ngAfterViewChecked(): void {
    Prism.highlightAll();
  }
}
