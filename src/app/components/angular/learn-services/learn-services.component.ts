import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-services',
  standalone: true,
  imports: [MatTabsModule ],
  templateUrl: './learn-services.component.html',
  styleUrl: './learn-services.component.scss'
})
export class LearnServicesComponent implements AfterViewChecked {
  code: string = `
  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class DataService {
    private data: any[] = [];

    constructor() { }

    getData(): any[] {
      return this.data;
    }

    addData(item: any): void {
      this.data.push(item);
    }

    clearData(): void {
      this.data = [];
    }
  }
  `;

  root: string = `
  @Injectable({
  providedIn: 'root'
  })
  export class MyService { }
  `;

  module: string = `@NgModule({
  providers: [MyService]
  })
  export class MyModule { }
  `;

  component: string = `
  @Component({
  providers: [MyService]
  })
  export class MyComponent { }
  `;

  injection: string = `export class MyComponent {
    constructor(private myService: MyService) {}

    ngOnInit() {
      console.log(this.myService.getData());
    }
  }
  `;

  hierarchicalInjection: string = ` @Component({
    providers: [MyService]
  })
  export class ParentComponent {
    constructor(private myService: MyService) { }
  }

  @Component({
    selector: 'app-child',
    template: '<p>Child Component</p>'
  })
  export class ChildComponent {
    constructor(private myService: MyService) { }
  }
  `;

  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
