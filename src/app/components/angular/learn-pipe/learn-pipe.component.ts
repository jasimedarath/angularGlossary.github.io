import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-pipe',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-pipe.component.html',
  styleUrl: './learn-pipe.component.scss'
})
export class LearnPipeComponent implements AfterViewChecked{
  code: string = `
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'capitalize'
  })
  export class CapitalizePipe implements PipeTransform {

    transform(value: string): string {
      if (!value) return value;
      return value.replace(/\b\w/g, first => first.toLocaleUpperCase());
    }
  }

  `;

  builtinPipes: string = `
  <p>{{ today | date:'fullDate' }}</p>

  <p>{{ 'hello' | uppercase }}</p>

  <p>{{ amount | currency:'USD' }}</p>

  <p>{{ 3.14159 | number:'1.2-2' }}</p>

  <p>{{ 0.25 | percent }}</p>

  <p>{{ object | json }}</p>

  <p>{{ items | slice:1:3 }}</p>

  <p>{{ observableValue | async }}</p>

  `;
  
  customPipes: string = `

  // Definition

  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({ name: 'exponentialStrength' })
  export class ExponentialStrengthPipe implements PipeTransform {
    transform(value: number, exponent: number): number {
      return Math.pow(value, exponent);
    }
  }

  //Register

  @NgModule({
  declarations: [ExponentialStrengthPipe],
    ...
  })
  export class AppModule { }

  //Usage

  <p>{{ 2 | exponentialStrength:3 }}</p> <!-- Outputs: 8 -->

  `;

  impurePipe: string = `
  @Pipe({ name: 'impurePipe', pure: false })
  export class ImpurePipe implements PipeTransform {
    transform(value: any): any {
      // Transform logic
    }
  }
  `;

  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}