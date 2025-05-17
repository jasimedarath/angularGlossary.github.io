import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import Prism from 'prismjs';

@Component({
  selector: 'app-learn-routing',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-routing.component.html',
  styleUrl: './learn-routing.component.scss',
})
export class LearnRoutingComponent implements AfterViewChecked {
  code: string = `
      import { NgModule } from '@angular/core';
      import { RouterModule, Routes } from '@angular/router';

      import { HomeComponent } from './home/home.component';
      import { AboutComponent } from './about/about.component';
      import { NotFoundComponent } from './not-found/not-found.component';
      import { UserComponent } from './user/user.component';
      import { UserDetailsComponent } from './user/user-details/user-details.component';
      import { UserSettingsComponent } from './user/user-settings/user-settings.component';
      import { ProductComponent } from './product/product.component';
      import { ProductDetailsComponent } from './product/product-details/product-details.component';

      const routes: Routes = [
        // Default route - when path is empty
        { path: '', component: HomeComponent },

        // Redirect example
        { path: 'home', redirectTo: '', pathMatch: 'full' },

        // Static route
        { path: 'about', component: AboutComponent },

        // Route with parameter
        { path: 'product/:id', component: ProductDetailsComponent },

        // Route with child routes
        {
          path: 'user',
          component: UserComponent,
          children: [
            { path: '', component: UserDetailsComponent }, // default child route
            { path: 'details', component: UserDetailsComponent },
            { path: 'settings', component: UserSettingsComponent },
          ]
        },

        // Wildcard route - for 404 page
        { path: '**', component: NotFoundComponent }
      ];

      @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
      })
      export class AppRoutingModule {}
  `;

  param1: string = `
        import { Component, OnInit } from '@angular/core';
        import { ActivatedRoute } from '@angular/router';

        @Component({
          selector: 'app-product-details',
          templateUrl: './product-details.component.html',
        })

        export class ProductDetailsComponent implements OnInit {

          productId!: string;

          constructor(private route: ActivatedRoute) {}

          ngOnInit(): void {
            this.productId = this.route.snapshot.paramMap.get('id')!;
          }
        }

  `;

  param2: string = `
      ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          this.productId = params.get('id')!;
        });
      }
  `;

  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
