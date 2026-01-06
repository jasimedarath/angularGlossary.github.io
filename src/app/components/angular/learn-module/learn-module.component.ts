import { Component, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-module',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-module.component.html',
  styleUrls: ['./learn-module.component.scss'],
})
export class LearnModuleComponent implements AfterViewChecked {
  code: string = `
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { AppComponent } from './app.component';
  import { OtherComponent } from './other.component';

  @NgModule({
    declarations: [
      AppComponent,
      OtherComponent
    ],
    imports: [
      BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  `;

  codeExtras: string = `import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyComponent } from './my-component.component';
import { MyDynamicComponent } from './my-dynamic-component.component';
import { MyDirective } from './my-directive.directive';

@NgModule({
  declarations: [MyComponent, MyDynamicComponent, MyDirective],
  imports: [CommonModule],
  exports: [MyComponent, MyDirective],
  entryComponents: [MyDynamicComponent],
  schemas: [NO_ERRORS_SCHEMA],
  id: 'MyUniqueModuleId'
})
export class MyModule { }
`;

  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
