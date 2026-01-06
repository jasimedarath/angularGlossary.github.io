import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-directive',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-directive.component.html',
  styleUrl: './learn-directive.component.scss',
})
export class LearnDirectiveComponent implements AfterViewChecked {
  code: string = `
    import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

    @Directive({
      selector: '[appHoverHighlight]'
    })
    export class HoverHighlightDirective {

      constructor(private el: ElementRef, private renderer: Renderer2) { }

      @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
      }

      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
      }

      private highlight(color: string | null) {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
      }
    }
  `;

  componentDir: string = `
    @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.component.html',
    styleUrls: ['./my-component.component.scss']
    })
    
    export class MyComponent {
      // Component logic here
    }
  `;
structuralDir: string = `
  //ngIf: Conditionally includes a template based on a boolean value.

         <div *ngIf="condition">Content to display if condition is true</div>

  // ngFor: Repeats a template for each item in a collection.

        <div *ngFor="let item of items">{{ item }}</div>

  //ngSwitch: Switches among multiple possible templates based on a value.

        <div [ngSwitch]="value">
          <div *ngSwitchCase="'case1'">Case 1 content</div>
          <div *ngSwitchCase="'case2'">Case 2 content</div>
          <div *ngSwitchDefault>Default content</div>
        </div>
`;
attributeDir: string = `
  //ngClass: Adds or removes CSS classes based on an expression.

        <div [ngClass]="{'active': isActive}">Toggle active class</div>


  //ngStyle: Applies inline styles to an element based on an expression.

        <div [ngStyle]="{'color': color}">Styled text</div>
  `;

  miscCode: string = `
    @Directive({
      selector: '[appHighlight]'
    })

    export class HighlightDirective {
      @HostBinding('style.backgroundColor') backgroundColor: string;

      @HostListener('mouseenter') onMouseEnter() {
        this.backgroundColor = 'yellow';
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.backgroundColor = 'transparent';
    }
  }
`;

  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
