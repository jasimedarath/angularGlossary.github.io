import { Routes } from '@angular/router';
import { LearnComponentComponent } from './components/learn-component/learn-component.component';
import { LearnModuleComponent } from './components/learn-module/learn-module.component';
import { LearnServicesComponent } from './components/learn-services/learn-services.component';
import { LearnLifecyclehooksComponent } from './components/learn-lifecyclehooks/learn-lifecyclehooks.component';
import { LearnDirectiveComponent } from './components/learn-directive/learn-directive.component';
import { LearnPipeComponent } from './components/learn-pipe/learn-pipe.component';
import { LearnInterceptorsComponent } from './components/learn-interceptors/learn-interceptors.component';
import { LearnGuardsComponent } from './components/learn-guards/learn-guards.component';
import { LearnFormsComponent } from './components/learn-forms/learn-forms.component';
import { LearnRxjsComponent } from './components/learn-rxjs/learn-rxjs.component';
import { LearnChangedetectionComponent } from './components/learn-changedetection/learn-changedetection.component';
import { LearnWebpackComponent } from './components/learn-webpack/learn-webpack.component';
import { LearnUnittestingComponent } from './components/learn-unittesting/learn-unittesting.component';
import { LearnSignalsComponent } from './components/learn-signals/learn-signals.component';
import { LearnNgrxComponent } from './components/learn-ngrx/learn-ngrx.component';
import { LearnAngularmaterialComponent } from './components/learn-angularmaterial/learn-angularmaterial.component';
import { LearnRoutingComponent } from './components/learn-routing/learn-routing.component';

export const routes: Routes = [
    { path: 'modules', component: LearnModuleComponent},
    { path: 'components', component: LearnComponentComponent},
    { path: 'directives', component: LearnDirectiveComponent},
    { path: 'pipes', component: LearnPipeComponent},
    { path: 'services', component: LearnServicesComponent},
    { path: 'routing', component: LearnRoutingComponent},
    { path: 'interceptors', component: LearnInterceptorsComponent},
    { path: 'guards', component: LearnGuardsComponent},
    { path: 'forms', component: LearnFormsComponent},
    { path: 'lifeCycleHooks', component: LearnLifecyclehooksComponent},
    { path: 'changeDetection', component: LearnChangedetectionComponent},
    { path: 'signals', component: LearnSignalsComponent},
    { path: 'ngrx', component: LearnNgrxComponent},
    { path: 'rxjs', component: LearnRxjsComponent},
    { path: 'webPack', component: LearnWebpackComponent},
    { path: 'unitTesting', component: LearnUnittestingComponent},
    { path: 'angularmaterial', component: LearnAngularmaterialComponent},
];
