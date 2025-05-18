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

  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
