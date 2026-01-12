import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// Angular components
import { LearnGettingstartedComponent } from './components/angular/learn-gettingstarted/learn-gettingstarted.component';
import { LearnModuleComponent } from './components/angular/learn-module/learn-module.component';
import { LearnComponentComponent } from './components/angular/learn-component/learn-component.component';
import { LearnDirectiveComponent } from './components/angular/learn-directive/learn-directive.component';
import { LearnPipeComponent } from './components/angular/learn-pipe/learn-pipe.component';
import { LearnServicesComponent } from './components/angular/learn-services/learn-services.component';
import { LearnRoutingComponent } from './components/angular/learn-routing/learn-routing.component';
import { LearnInterceptorsComponent } from './components/angular/learn-interceptors/learn-interceptors.component';
import { LearnGuardsComponent } from './components/angular/learn-guards/learn-guards.component';
import { LearnFormsComponent } from './components/angular/learn-forms/learn-forms.component';
import { LearnLifecyclehooksComponent } from './components/angular/learn-lifecyclehooks/learn-lifecyclehooks.component';
import { LearnChangedetectionComponent } from './components/angular/learn-changedetection/learn-changedetection.component';
import { LearnSignalsComponent } from './components/angular/learn-signals/learn-signals.component';
import { LearnNgrxComponent } from './components/angular/learn-ngrx/learn-ngrx.component';
import { LearnRxjsComponent } from './components/angular/learn-rxjs/learn-rxjs.component';
import { LearnWebpackComponent } from './components/angular/learn-webpack/learn-webpack.component';
import { LearnUnittestingComponent } from './components/angular/learn-unittesting/learn-unittesting.component';
import { LearnAngularmaterialComponent } from './components/angular/learn-angularmaterial/learn-angularmaterial.component';
import { LearnDependencyInjectionComponent } from './components/angular/learn-dependency-injection/learn-dependency-injection.component';
import { LearnControlFlowComponent } from './components/angular/learn-control-flow/learn-control-flow.component';
import { LearnDeferrableViewsComponent } from './components/angular/learn-deferrable-views/learn-deferrable-views.component';
import { LearnSsrHydrationComponent } from './components/angular/learn-ssr-hydration/learn-ssr-hydration.component';
// React components
import { ReactGettingstartedComponent } from './components/react/react-gettingstarted/react-gettingstarted.component';
import { ReactJsxComponent } from './components/react/react-jsx/react-jsx.component';
import { ReactComponentsComponent } from './components/react/react-components/react-components.component';
import { ReactPropsComponent } from './components/react/react-props/react-props.component';
import { ReactStateComponent } from './components/react/react-state/react-state.component';
import { ReactHooksComponent } from './components/react/react-hooks/react-hooks.component';
import { ReactEventsComponent } from './components/react/react-events/react-events.component';
import { ReactConditionalComponent } from './components/react/react-conditional/react-conditional.component';
import { ReactListsComponent } from './components/react/react-lists/react-lists.component';
import { ReactFormsComponent } from './components/react/react-forms/react-forms.component';
import { ReactContextComponent } from './components/react/react-context/react-context.component';
import { ReactRouterComponent } from './components/react/react-router/react-router.component';
import { ReactPerformanceComponent } from './components/react/react-performance/react-performance.component';
import { ReactLifecycleComponent } from './components/react/react-lifecycle/react-lifecycle.component';
import { ReactAdvancedComponent } from './components/react/react-advanced/react-advanced.component';
import { ReactReact18Component } from './components/react/react-react18/react-react18.component';
import { ReactTestingComponent } from './components/react/react-testing/react-testing.component';
import { ReactTypescriptComponent } from './components/react/react-typescript/react-typescript.component';
import { ReactStatemanagementComponent } from './components/react/react-statemanagement/react-statemanagement.component';
import { ReactStylingComponent } from './components/react/react-styling/react-styling.component';
import { ReactDatafetchingComponent } from './components/react/react-datafetching/react-datafetching.component';
// Next.js components
import { NextjsGettingstartedComponent } from './components/nextjs/nextjs-gettingstarted/nextjs-gettingstarted.component';
import { NextjsApprouterComponent } from './components/nextjs/nextjs-approuter/nextjs-approuter.component';
import { NextjsRenderingComponent } from './components/nextjs/nextjs-rendering/nextjs-rendering.component';
import { NextjsDatafetchingComponent } from './components/nextjs/nextjs-datafetching/nextjs-datafetching.component';
import { NextjsServercomponentsComponent } from './components/nextjs/nextjs-servercomponents/nextjs-servercomponents.component';
import { NextjsApiroutesComponent } from './components/nextjs/nextjs-apiroutes/nextjs-apiroutes.component';
import { NextjsMiddlewareComponent } from './components/nextjs/nextjs-middleware/nextjs-middleware.component';
import { NextjsOptimizationComponent } from './components/nextjs/nextjs-optimization/nextjs-optimization.component';
import { NextjsDeploymentComponent } from './components/nextjs/nextjs-deployment/nextjs-deployment.component';
import { NextjsAuthenticationComponent } from './components/nextjs/nextjs-authentication/nextjs-authentication.component';
import { NextjsDatabaseComponent } from './components/nextjs/nextjs-database/nextjs-database.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    
    // Angular routes
    { path: 'angular/gettingstarted', component: LearnGettingstartedComponent },
    { path: 'angular/modules', component: LearnModuleComponent },
    { path: 'angular/components', component: LearnComponentComponent },
    { path: 'angular/directives', component: LearnDirectiveComponent },
    { path: 'angular/pipes', component: LearnPipeComponent },
    { path: 'angular/services', component: LearnServicesComponent },
    { path: 'angular/routing', component: LearnRoutingComponent },
    { path: 'angular/interceptors', component: LearnInterceptorsComponent },
    { path: 'angular/guards', component: LearnGuardsComponent },
    { path: 'angular/forms', component: LearnFormsComponent },
    { path: 'angular/lifeCycleHooks', component: LearnLifecyclehooksComponent },
    { path: 'angular/changeDetection', component: LearnChangedetectionComponent },
    { path: 'angular/signals', component: LearnSignalsComponent },
    { path: 'angular/ngrx', component: LearnNgrxComponent },
    { path: 'angular/rxjs', component: LearnRxjsComponent },
    { path: 'angular/webPack', component: LearnWebpackComponent },
    { path: 'angular/unitTesting', component: LearnUnittestingComponent },
    { path: 'angular/angularmaterial', component: LearnAngularmaterialComponent },
    { path: 'angular/dependencyInjection', component: LearnDependencyInjectionComponent },
    { path: 'angular/controlFlow', component: LearnControlFlowComponent },
    { path: 'angular/deferrableViews', component: LearnDeferrableViewsComponent },
    { path: 'angular/ssrHydration', component: LearnSsrHydrationComponent },
    { path: 'angular', redirectTo: 'angular/components', pathMatch: 'full' },
    
    // React routes
    { path: 'react/gettingstarted', component: ReactGettingstartedComponent },
    { path: 'react/jsx', component: ReactJsxComponent },
    { path: 'react/components', component: ReactComponentsComponent },
    { path: 'react/props', component: ReactPropsComponent },
    { path: 'react/state', component: ReactStateComponent },
    { path: 'react/hooks', component: ReactHooksComponent },
    { path: 'react/events', component: ReactEventsComponent },
    { path: 'react/conditional', component: ReactConditionalComponent },
    { path: 'react/lists', component: ReactListsComponent },
    { path: 'react/forms', component: ReactFormsComponent },
    { path: 'react/context', component: ReactContextComponent },
    { path: 'react/router', component: ReactRouterComponent },
    { path: 'react/performance', component: ReactPerformanceComponent },
    { path: 'react/lifecycle', component: ReactLifecycleComponent },
    { path: 'react/advanced', component: ReactAdvancedComponent },
    { path: 'react/react18', component: ReactReact18Component },
    { path: 'react/testing', component: ReactTestingComponent },
    { path: 'react/typescript', component: ReactTypescriptComponent },
    { path: 'react/statemanagement', component: ReactStatemanagementComponent },
    { path: 'react/styling', component: ReactStylingComponent },
    { path: 'react/datafetching', component: ReactDatafetchingComponent },
    { path: 'react', redirectTo: 'react/jsx', pathMatch: 'full' },
    
    // Next.js routes
    { path: 'nextjs/gettingstarted', component: NextjsGettingstartedComponent },
    { path: 'nextjs/approuter', component: NextjsApprouterComponent },
    { path: 'nextjs/rendering', component: NextjsRenderingComponent },
    { path: 'nextjs/datafetching', component: NextjsDatafetchingComponent },
    { path: 'nextjs/servercomponents', component: NextjsServercomponentsComponent },
    { path: 'nextjs/apiroutes', component: NextjsApiroutesComponent },
    { path: 'nextjs/middleware', component: NextjsMiddlewareComponent },
    { path: 'nextjs/optimization', component: NextjsOptimizationComponent },
    { path: 'nextjs/deployment', component: NextjsDeploymentComponent },
    { path: 'nextjs/authentication', component: NextjsAuthenticationComponent },
    { path: 'nextjs/database', component: NextjsDatabaseComponent },
    { path: 'nextjs', redirectTo: 'nextjs/gettingstarted', pathMatch: 'full' }
];
