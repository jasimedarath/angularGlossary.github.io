import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angularGlossary';
  hideHeader: boolean = false;
  modules = [
    { title: 'Modules', link: 'modules' },
    { title: 'Components', link: 'components' },
    { title: 'Directives', link: 'directives' },
    { title: 'Pipes', link: 'pipes' },
    { title: 'Services', link: 'services' },
    { title: 'Routing', link: 'routing' },
    { title: 'Interceptors', link: 'interceptors' },
    { title: 'Guards', link: 'guards' },
    { title: 'Forms', link: 'forms' },
    { title: 'Life Cycle Hooks', link: 'lifeCycleHooks' },
    { title: 'Change Detection', link: 'changeDetection' },
    { title: 'Dependency Injection', link: 'unitTesting' },
    { title: 'Signals', link: 'signals' },
    { title: 'RxJS', link: 'rxjs' },
    { title: 'Web Pack', link: 'webPack' },
    { title: 'Unit Testing', link: 'unitTesting' },
    { title: 'NgRx', link: 'ngrx' },
    { title: 'Angular Material', link: 'angularmaterial' },
  ];

  displayHeader = () => this.hideHeader = !this.hideHeader;

}
