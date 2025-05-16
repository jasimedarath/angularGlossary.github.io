import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-lifecyclehooks',
  standalone: true,
  imports: [],
  templateUrl: './learn-lifecyclehooks.component.html',
  styleUrl: './learn-lifecyclehooks.component.scss'
})
export class LearnLifecyclehooksComponent implements OnInit{
  code: string = `
  import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Input, SimpleChanges } from '@angular/core';
  
  @Component({
    selector: 'app-compA',
    standalone: true,
    imports: [],
    templateUrl: './component-name.component.html',
    styleUrls: ['./component-name.component.scss'],
  })
  export class ComponentNameComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    @Input() inputProperty: any;
  
    constructor() {
      // Constructor is called first, before any other lifecycle hook
    }
  
    ngOnInit() {
      // ngOnInit is called once after the first ngOnChanges
      // Purpose: Initialize the component after Angular first displays the data-bound properties
    }
  
    ngOnChanges(changes: SimpleChanges) {
      // ngOnChanges is called when any data-bound input property changes
      // Purpose: Respond to changes in input properties
    }
  
    ngDoCheck() {
      // ngDoCheck is called during every change detection run
      // Purpose: Detect and act upon changes that Angular doesn't automatically detect
    }
  
    ngAfterContentInit() {
      // ngAfterContentInit is called once after the first ngDoCheck
      // Purpose: Respond after Angular projects external content into the component's view
    }
  
    ngAfterContentChecked() {
      // ngAfterContentChecked is called after ngAfterContentInit and every subsequent ngDoCheck
      // Purpose: Respond after Angular checks the content projected into the component
    }
  
    ngAfterViewInit() {
      // ngAfterViewInit is called once after the first ngAfterContentChecked
      // Purpose: Respond after Angular initializes the component's views and child views
    }
  
    ngAfterViewChecked() {
      // ngAfterViewChecked is called after ngAfterViewInit and every subsequent ngAfterContentChecked
      // Purpose: Respond after Angular checks the component's views and child views
    }
  
    ngOnDestroy() {
      // ngOnDestroy is called just before Angular destroys the component
      // Purpose: Cleanup before Angular destroys the component
    }
  }
  `.trim();
  
  @ViewChild('codeElement') codeElement!: ElementRef;

  ngOnInit() {
    Prism.highlightAll();
  }
}
