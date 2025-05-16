import { AfterViewChecked, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-forms',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-forms.component.html',
  styleUrl: './learn-forms.component.scss'
})
export class LearnFormsComponent implements AfterViewChecked {

  tempForms1:string = `
    import { FormsModule } from '@angular/forms';

    @NgModule({
      imports: [FormsModule]
    })
    export class AppModule { }
    `;

  tempForms2:string = `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" ngModel required>
      <button type="submit">Submit</button>
    </form>
    `;

  tempForms3:string = `
    <input type="text" id="name" name="name" ngModel required>
  `;

  tempForms4:string = `
    <div *ngIf="form.controls['name'].invalid && form.controls['name'].touched">
      Name is required.
    </div>
  `;

  tempForms5:string = `
    export class MyComponent {
      onSubmit(form: NgForm) {
        console.log(form.value);
      }
    }
  `;

  reactForms1: string = `
    import { ReactiveFormsModule } from '@angular/forms';

      @NgModule({
        imports: [ReactiveFormsModule]
      })
      export class AppModule { }
  `;

  reactForms2: string = `
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  export class MyComponent implements OnInit {
    myForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
      this.myForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
    }

    onSubmit() {
      console.log(this.myForm.value);
    }
  }
  `;

  reactForms3: string = `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <label for="name">Name:</label>
      <input type="text" id="name" formControlName="name">
      <div *ngIf="myForm.get('name').invalid && myForm.get('name').touched">
        Name is required.
      </div>

      <label for="email">Email:</label>
      <input type="email" id="email" formControlName="email">
      <div *ngIf="myForm.get('email').invalid && myForm.get('email').touched">
        Enter a valid email.
      </div>

      <button type="submit">Submit</button>
    </form>
  `;

  reactForms4: string = `
    this.myForm = this.fb.group({
      name: ['', Validators.required]
    });
  `;

  reactForms5: string = `
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  `;

  reactForms6: string = `
  import { AbstractControl, ValidatorFn } from '@angular/forms';

  export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
  `;

  reactForms7: string = `
    this.myForm = this.fb.group({
      name: ['', [Validators.required, forbiddenNameValidator(/bob/i)]]
    });
  `;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }



}
