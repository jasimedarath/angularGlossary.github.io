import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    
    // Angular routes with lazy loading
    { 
        path: 'angular/gettingstarted', 
        loadComponent: () => import('./components/angular/learn-gettingstarted/learn-gettingstarted.component').then(m => m.LearnGettingstartedComponent)
    },
    { 
        path: 'angular/modules', 
        loadComponent: () => import('./components/angular/learn-module/learn-module.component').then(m => m.LearnModuleComponent)
    },
    { 
        path: 'angular/components', 
        loadComponent: () => import('./components/angular/learn-component/learn-component.component').then(m => m.LearnComponentComponent)
    },
    { 
        path: 'angular/directives', 
        loadComponent: () => import('./components/angular/learn-directive/learn-directive.component').then(m => m.LearnDirectiveComponent)
    },
    { 
        path: 'angular/pipes', 
        loadComponent: () => import('./components/angular/learn-pipe/learn-pipe.component').then(m => m.LearnPipeComponent)
    },
    { 
        path: 'angular/services', 
        loadComponent: () => import('./components/angular/learn-services/learn-services.component').then(m => m.LearnServicesComponent)
    },
    { 
        path: 'angular/routing', 
        loadComponent: () => import('./components/angular/learn-routing/learn-routing.component').then(m => m.LearnRoutingComponent)
    },
    { 
        path: 'angular/interceptors', 
        loadComponent: () => import('./components/angular/learn-interceptors/learn-interceptors.component').then(m => m.LearnInterceptorsComponent)
    },
    { 
        path: 'angular/guards', 
        loadComponent: () => import('./components/angular/learn-guards/learn-guards.component').then(m => m.LearnGuardsComponent)
    },
    { 
        path: 'angular/forms', 
        loadComponent: () => import('./components/angular/learn-forms/learn-forms.component').then(m => m.LearnFormsComponent)
    },
    { 
        path: 'angular/lifeCycleHooks', 
        loadComponent: () => import('./components/angular/learn-lifecyclehooks/learn-lifecyclehooks.component').then(m => m.LearnLifecyclehooksComponent)
    },
    { 
        path: 'angular/changeDetection', 
        loadComponent: () => import('./components/angular/learn-changedetection/learn-changedetection.component').then(m => m.LearnChangedetectionComponent)
    },
    { 
        path: 'angular/signals', 
        loadComponent: () => import('./components/angular/learn-signals/learn-signals.component').then(m => m.LearnSignalsComponent)
    },
    { 
        path: 'angular/ngrx', 
        loadComponent: () => import('./components/angular/learn-ngrx/learn-ngrx.component').then(m => m.LearnNgrxComponent)
    },
    { 
        path: 'angular/rxjs', 
        loadComponent: () => import('./components/angular/learn-rxjs/learn-rxjs.component').then(m => m.LearnRxjsComponent)
    },
    { 
        path: 'angular/webPack', 
        loadComponent: () => import('./components/angular/learn-webpack/learn-webpack.component').then(m => m.LearnWebpackComponent)
    },
    { 
        path: 'angular/unitTesting', 
        loadComponent: () => import('./components/angular/learn-unittesting/learn-unittesting.component').then(m => m.LearnUnittestingComponent)
    },
    { 
        path: 'angular/angularmaterial', 
        loadComponent: () => import('./components/angular/learn-angularmaterial/learn-angularmaterial.component').then(m => m.LearnAngularmaterialComponent)
    },
    { 
        path: 'angular/dependencyInjection', 
        loadComponent: () => import('./components/angular/learn-dependency-injection/learn-dependency-injection.component').then(m => m.LearnDependencyInjectionComponent)
    },
    { 
        path: 'angular/controlFlow', 
        loadComponent: () => import('./components/angular/learn-control-flow/learn-control-flow.component').then(m => m.LearnControlFlowComponent)
    },
    { 
        path: 'angular/deferrableViews', 
        loadComponent: () => import('./components/angular/learn-deferrable-views/learn-deferrable-views.component').then(m => m.LearnDeferrableViewsComponent)
    },
    { 
        path: 'angular/ssrHydration', 
        loadComponent: () => import('./components/angular/learn-ssr-hydration/learn-ssr-hydration.component').then(m => m.LearnSsrHydrationComponent)
    },
    { path: 'angular', redirectTo: 'angular/gettingstarted', pathMatch: 'full' },
    
    // React routes with lazy loading
    { 
        path: 'react/gettingstarted', 
        loadComponent: () => import('./components/react/react-gettingstarted/react-gettingstarted.component').then(m => m.ReactGettingstartedComponent)
    },
    { 
        path: 'react/jsx', 
        loadComponent: () => import('./components/react/react-jsx/react-jsx.component').then(m => m.ReactJsxComponent)
    },
    { 
        path: 'react/components', 
        loadComponent: () => import('./components/react/react-components/react-components.component').then(m => m.ReactComponentsComponent)
    },
    { 
        path: 'react/props', 
        loadComponent: () => import('./components/react/react-props/react-props.component').then(m => m.ReactPropsComponent)
    },
    { 
        path: 'react/state', 
        loadComponent: () => import('./components/react/react-state/react-state.component').then(m => m.ReactStateComponent)
    },
    { 
        path: 'react/hooks', 
        loadComponent: () => import('./components/react/react-hooks/react-hooks.component').then(m => m.ReactHooksComponent)
    },
    { 
        path: 'react/events', 
        loadComponent: () => import('./components/react/react-events/react-events.component').then(m => m.ReactEventsComponent)
    },
    { 
        path: 'react/conditional', 
        loadComponent: () => import('./components/react/react-conditional/react-conditional.component').then(m => m.ReactConditionalComponent)
    },
    { 
        path: 'react/lists', 
        loadComponent: () => import('./components/react/react-lists/react-lists.component').then(m => m.ReactListsComponent)
    },
    { 
        path: 'react/forms', 
        loadComponent: () => import('./components/react/react-forms/react-forms.component').then(m => m.ReactFormsComponent)
    },
    { 
        path: 'react/context', 
        loadComponent: () => import('./components/react/react-context/react-context.component').then(m => m.ReactContextComponent)
    },
    { 
        path: 'react/router', 
        loadComponent: () => import('./components/react/react-router/react-router.component').then(m => m.ReactRouterComponent)
    },
    { 
        path: 'react/performance', 
        loadComponent: () => import('./components/react/react-performance/react-performance.component').then(m => m.ReactPerformanceComponent)
    },
    { 
        path: 'react/lifecycle', 
        loadComponent: () => import('./components/react/react-lifecycle/react-lifecycle.component').then(m => m.ReactLifecycleComponent)
    },
    { 
        path: 'react/advanced', 
        loadComponent: () => import('./components/react/react-advanced/react-advanced.component').then(m => m.ReactAdvancedComponent)
    },
    { 
        path: 'react/react18', 
        loadComponent: () => import('./components/react/react-react18/react-react18.component').then(m => m.ReactReact18Component)
    },
    { 
        path: 'react/testing', 
        loadComponent: () => import('./components/react/react-testing/react-testing.component').then(m => m.ReactTestingComponent)
    },
    { 
        path: 'react/typescript', 
        loadComponent: () => import('./components/react/react-typescript/react-typescript.component').then(m => m.ReactTypescriptComponent)
    },
    { 
        path: 'react/statemanagement', 
        loadComponent: () => import('./components/react/react-statemanagement/react-statemanagement.component').then(m => m.ReactStatemanagementComponent)
    },
    { 
        path: 'react/styling', 
        loadComponent: () => import('./components/react/react-styling/react-styling.component').then(m => m.ReactStylingComponent)
    },
    { 
        path: 'react/datafetching', 
        loadComponent: () => import('./components/react/react-datafetching/react-datafetching.component').then(m => m.ReactDatafetchingComponent)
    },
    { path: 'react', redirectTo: 'react/jsx', pathMatch: 'full' },
    
    // Next.js routes with lazy loading
    { 
        path: 'nextjs/gettingstarted', 
        loadComponent: () => import('./components/nextjs/nextjs-gettingstarted/nextjs-gettingstarted.component').then(m => m.NextjsGettingstartedComponent)
    },
    { 
        path: 'nextjs/approuter', 
        loadComponent: () => import('./components/nextjs/nextjs-approuter/nextjs-approuter.component').then(m => m.NextjsApprouterComponent)
    },
    { 
        path: 'nextjs/rendering', 
        loadComponent: () => import('./components/nextjs/nextjs-rendering/nextjs-rendering.component').then(m => m.NextjsRenderingComponent)
    },
    { 
        path: 'nextjs/datafetching', 
        loadComponent: () => import('./components/nextjs/nextjs-datafetching/nextjs-datafetching.component').then(m => m.NextjsDatafetchingComponent)
    },
    { 
        path: 'nextjs/servercomponents', 
        loadComponent: () => import('./components/nextjs/nextjs-servercomponents/nextjs-servercomponents.component').then(m => m.NextjsServercomponentsComponent)
    },
    { 
        path: 'nextjs/apiroutes', 
        loadComponent: () => import('./components/nextjs/nextjs-apiroutes/nextjs-apiroutes.component').then(m => m.NextjsApiroutesComponent)
    },
    { 
        path: 'nextjs/middleware', 
        loadComponent: () => import('./components/nextjs/nextjs-middleware/nextjs-middleware.component').then(m => m.NextjsMiddlewareComponent)
    },
    { 
        path: 'nextjs/optimization', 
        loadComponent: () => import('./components/nextjs/nextjs-optimization/nextjs-optimization.component').then(m => m.NextjsOptimizationComponent)
    },
    { 
        path: 'nextjs/deployment', 
        loadComponent: () => import('./components/nextjs/nextjs-deployment/nextjs-deployment.component').then(m => m.NextjsDeploymentComponent)
    },
    { 
        path: 'nextjs/authentication', 
        loadComponent: () => import('./components/nextjs/nextjs-authentication/nextjs-authentication.component').then(m => m.NextjsAuthenticationComponent)
    },
    { 
        path: 'nextjs/database', 
        loadComponent: () => import('./components/nextjs/nextjs-database/nextjs-database.component').then(m => m.NextjsDatabaseComponent)
    },
    { path: 'nextjs', redirectTo: 'nextjs/gettingstarted', pathMatch: 'full' }
];
