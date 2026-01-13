import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-component',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-component.component.html',
  styleUrl: './learn-component.component.scss',
})
export class LearnComponentComponent implements AfterViewChecked {
  code: string = `
  import { Component} from '@angular/core';

  @Component({
    selector: 'app-compA',
    standalone: true,
    imports: [],
    templateUrl: './comonent-name.component.html',
    styleUrls: ['./comonent-name.component.scss'],
  })
    
  export class ComponentNameComponent {
  
  }`;

  inputOutput: string = `// Child component
  @Component({
    selector: 'child-component',
    template: '<button (click)="notifyParent()">Click me</button>'
  })
  export class ChildComponent {
    @Input() data: string;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    notifyParent() {
      this.notify.emit('Child component clicked');
    }
  }

  // Parent component
  @Component({
    selector: 'parent-component',
    template: '<child-component [data]="parentData" (notify)="handleNotify($event)"></child-component>'
  })
  export class ParentComponent {
    parentData = 'Hello from parent';

    handleNotify(event: string) {
      console.log(event);
    }
  }
  `;

  viewChild: string = `// Child component
  @Component({
    selector: 'child-component',
    template: '<p>Child Component</p>'
  })
  export class ChildComponent {
    childData = 'Data from child';
  }

  // Parent component
  @Component({
    selector: 'parent-component',
    template: '<child-component></child-component>'
  })
  export class ParentComponent implements AfterViewInit {
    @ViewChild(ChildComponent) childComponent: ChildComponent;

    ngAfterViewInit() {
      console.log(this.childComponent.childData);
    }
  }
  `;

   viewContentChild: string = `// Parent component
    <my-card>
      <p #projectedParagraph>This is content projected into the card.</p>
    </my-card>


  // Child component
  import { Component, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

  @Component({
    selector: 'my-card',
    template: \`
      <div class="card">
        <ng-content></ng-content>
      </div>
    \`
  })
  export class MyCardComponent implements AfterContentInit {
    @ContentChild('projectedParagraph') paragraph!: ElementRef;

    ngAfterContentInit() {
      console.log('Projected Content:', this.paragraph.nativeElement.textContent);
    }
  }

  `;

  serviceBased: string = `@Injectable({
    providedIn: 'root'
  })
  export class SharedService {
    private data = new BehaviorSubject<string>('Initial data');
    data$ = this.data.asObservable();

    updateData(newData: string) {
      this.data.next(newData);
    }
  }

  // Component A
  @Component({
    selector: 'component-a',
    template: '<button (click)="updateData()">Update Data</button>'
  })
  export class ComponentA {
    constructor(private sharedService: SharedService) {}

    updateData() {
      this.sharedService.updateData('Updated data from Component A');
    }
  }

  // Component B
  @Component({
    selector: 'component-b',
    template: '<p>{{ data }}</p>'
  })
  export class ComponentB implements OnInit {
    data: string;

    constructor(private sharedService: SharedService) {}

    ngOnInit() {
      this.sharedService.data$.subscribe(data => this.data = data);
    }
  }
  `;
  eventEmitter: string = `@Injectable({
    providedIn: 'root'
  })
  export class EventEmitterService {
    event = new EventEmitter<string>();

    emitEvent(message: string) {
      this.event.emit(message);
    }
  }

  // Component A
  @Component({
    selector: 'component-a',
    template: '<button (click)="emitEvent()">Emit Event</button>'
  })
  export class ComponentA {
    constructor(private eventEmitterService: EventEmitterService) {}

    emitEvent() {
      this.eventEmitterService.emitEvent('Event from Component A');
    }
  }

  // Component B
  @Component({
    selector: 'component-b',
    template: '<p>{{ message }}</p>'
  })
  export class ComponentB implements OnInit {
    message: string;

    constructor(private eventEmitterService: EventEmitterService) {}

    ngOnInit() {
      this.eventEmitterService.event.subscribe(message => this.message = message);
    }
  }
  `;

  reactiveForms: string = `
  @Component({
    selector: 'form-component',
    template: \`
      <form [formGroup]="formGroup">
        <input formControlName="name">
      </form>
      <p>{{ formGroup.get('name').value }}</p>
    \`
  })
  export class FormComponent implements OnInit {
    formGroup: FormGroup;
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit() {
      this.formGroup = this.fb.group({
        name: ['']
      });
    }
  }
  `;
  templateRef: string = `// Child component
@Component({
  selector: 'child-component',
  template: '<p>Child Component</p>'
})
export class ChildComponent {
  childData = 'Data from child';
}

// Parent component
@Component({
  selector: 'parent-component',
  template: \`
    <child-component #childRef></child-component>
    <button (click)="accessChildData(childRef)">Access Child Data</button>
  \`
})
export class ParentComponent {
  accessChildData(child: ChildComponent) {
    console.log(child.childData);
  }
}
`;

codeExtras: string =`import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-compA',
  standalone: true,
  imports: [],
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss'],
  providers: [MyService],
  animations: [trigger('myAnimation', [
    state('state1', style({ backgroundColor: 'blue' })),
    transition('state1 => state2', [animate('1s')])
  ])],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '[class.special]': 'isSpecial',
    '(click)': 'onClick()'
  },
  interpolation: ['{{', '}}'],
  moduleId: module.id,
  entryComponents: [MyDynamicComponent],
  viewProviders: [AnotherService],
  exportAs: 'myComponentAlias',
  template: '<p>This is an inline template</p>'
})
export class CompAComponent {
  // Component logic here
}
`;

  standaloneMigration: string = `# Convert a component to standalone
ng generate @angular/core:standalone --path=src/app/my-component

# Convert entire project to standalone
ng generate @angular/core:standalone

# Migration steps for manual conversion:
# 1. Add standalone: true to @Component decorator
# 2. Add imports array with dependencies
# 3. Remove from NgModule declarations
# 4. Update tests to import component directly`;

  standaloneComparison: string = `// NgModule-based Component
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule, FormsModule],
  exports: [MyComponent]
})
export class MyModule { }

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponent { }

// Standalone Component (Angular 14+)
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-component.component.html'
})
export class MyComponent { }`;

  standaloneBootstrap: string = `// main.ts - Bootstrapping standalone application
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Add other providers here
  ]
}).catch(err => console.error(err));`;

  standaloneLazyLoading: string = `// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'users',
    loadChildren: () => 
      import('./users/users.routes').then(m => m.USERS_ROUTES)
  }
];

// users.routes.ts
export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: ':id',
    component: UserDetailComponent
  }
];`;

  componentLifecycle: string = `import { Component, OnInit, OnDestroy, OnChanges, 
  DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: '<p>Lifecycle Demo</p>'
})
export class LifecycleComponent implements OnInit, OnDestroy, 
  OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked {
  
  constructor() {
    console.log('1. Constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('2. OnChanges called', changes);
  }

  ngOnInit() {
    console.log('3. OnInit called');
  }

  ngDoCheck() {
    console.log('4. DoCheck called');
  }

  ngAfterContentInit() {
    console.log('5. AfterContentInit called');
  }

  ngAfterContentChecked() {
    console.log('6. AfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('7. AfterViewInit called');
  }

  ngAfterViewChecked() {
    console.log('8. AfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('9. OnDestroy called');
  }
}`;

  dynamicComponents: string = `import { Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'app-host',
  template: '<ng-container #dynamicContainer></ng-container>'
})
export class HostComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) 
  container!: ViewContainerRef;
  
  private componentRef?: ComponentRef<DynamicComponent>;

  loadDynamicComponent() {
    // Clear any existing component
    this.container.clear();
    
    // Create the component dynamically
    this.componentRef = this.container.createComponent(DynamicComponent);
    
    // Pass data to dynamic component
    this.componentRef.instance.data = 'Hello from parent';
    
    // Subscribe to outputs
    this.componentRef.instance.eventEmitter.subscribe(event => {
      console.log('Event from dynamic component:', event);
    });
  }

  ngOnDestroy() {
    // Clean up
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}`;

  contentProjection: string = `// Multi-slot content projection
@Component({
  selector: 'app-card',
  template: \`
    <div class="card">
      <div class="header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="body">
        <ng-content></ng-content>
      </div>
      <div class="footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  \`
})
export class CardComponent { }

// Usage
@Component({
  template: \`
    <app-card>
      <h2 card-header>Card Title</h2>
      <p>Main content goes here</p>
      <button card-footer>Action</button>
    </app-card>
  \`
})
export class ParentComponent { }

// Conditional content projection
@Component({
  selector: 'app-expandable',
  template: \`
    <div class="content">
      <ng-content></ng-content>
    </div>
    <div class="extra" *ngIf="expanded">
      <ng-content select="[extra-content]"></ng-content>
    </div>
  \`
})
export class ExpandableComponent {
  @Input() expanded = false;
}`;

  componentInheritance: string = `// Base component with common functionality
@Component({ template: '' })
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected subscriptions = new Subscription();
  protected isLoading = false;

  ngOnInit() {
    this.initialize();
  }

  abstract initialize(): void;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected handleError(error: any) {
    console.error('Error:', error);
    this.isLoading = false;
  }
}

// Child component extending base
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent extends BaseComponent {
  users: User[] = [];

  constructor(private userService: UserService) {
    super();
  }

  initialize() {
    this.isLoading = true;
    this.subscriptions.add(
      this.userService.getUsers().subscribe({
        next: users => {
          this.users = users;
          this.isLoading = false;
        },
        error: err => this.handleError(err)
      })
    );
  }
}`;

  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
