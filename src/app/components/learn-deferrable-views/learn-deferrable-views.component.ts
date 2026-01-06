import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-deferrable-views',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-deferrable-views.component.html',
  styleUrl: './learn-deferrable-views.component.scss',
})
export class LearnDeferrableViewsComponent implements AfterViewChecked {
  basicDefer: string = `// Basic @defer block
@defer {
  <heavy-component />
}

// With placeholder
@defer {
  <heavy-component />
} @placeholder {
  <div>Loading...</div>
}

// With loading state
@defer {
  <heavy-component />
} @loading (minimum 2s) {
  <spinner-component />
} @placeholder {
  <div>Click to load</div>
}

// With error handling
@defer {
  <heavy-component />
} @error {
  <div>Failed to load component</div>
} @placeholder {
  <div>Content placeholder</div>
}`;

  deferTriggers: string = `// Viewport trigger - loads when enters viewport
@defer (on viewport) {
  <chart-component />
} @placeholder {
  <div>Chart will load when visible</div>
}

// Interaction trigger - loads on user interaction
@defer (on interaction) {
  <video-player />
} @placeholder {
  <div>Click to load video player</div>
}

// Hover trigger
@defer (on hover) {
  <tooltip-details />
} @placeholder {
  <span>Hover for details</span>
}

// Idle trigger - loads when browser is idle
@defer (on idle) {
  <analytics-dashboard />
}

// Timer trigger - loads after specified time
@defer (on timer(5s)) {
  <advertisement />
}

// Immediate trigger - loads immediately
@defer (on immediate) {
  <critical-component />
}`;

  prefetching: string = `// Prefetch on idle
@defer (on viewport; prefetch on idle) {
  <data-table [data]="largeDataset" />
} @placeholder {
  <div>Table will load when visible</div>
}

// Prefetch on interaction
@defer (on hover; prefetch on interaction) {
  <user-profile [userId]="userId" />
}

// Multiple prefetch conditions
@defer (on viewport; prefetch on hover; prefetch on interaction) {
  <complex-chart />
}`;

  advancedPatterns: string = `// Conditional defer with trigger references
<button #loadBtn>Load Content</button>

@defer (on interaction(loadBtn)) {
  <lazy-content />
} @placeholder {
  <div>Click button to load</div>
}

// Nested defer blocks
@defer (on viewport) {
  <parent-component>
    @defer (on idle) {
      <child-expensive-component />
    } @placeholder {
      <child-placeholder />
    }
  </parent-component>
}

// With minimum loading time
@defer (on viewport) {
  <data-grid />
} @loading (minimum 1s; after 500ms) {
  <loading-spinner />
} @placeholder (minimum 2s) {
  <skeleton-loader />
}`;

  realWorldExample: string = `// E-commerce product page
@Component({
  template: \`
    <div class="product-page">
      <!-- Critical content loads immediately -->
      <product-header [product]="product" />
      <product-images [images]="product.images" />
      
      <!-- Reviews load when scrolled into view -->
      @defer (on viewport; prefetch on idle) {
        <product-reviews [productId]="product.id" />
      } @placeholder {
        <div class="reviews-skeleton">
          Loading reviews...
        </div>
      }
      
      <!-- Related products load after idle -->
      @defer (on idle) {
        <related-products [category]="product.category" />
      } @loading (minimum 1s) {
        <spinner />
      }
      
      <!-- Recommendations load on interaction -->
      <section #recommendationSection>
        @defer (on viewport(recommendationSection)) {
          <product-recommendations [userId]="currentUser.id" />
        } @error {
          <div>Unable to load recommendations</div>
        }
      </section>
    </div>
  \`
})
export class ProductPageComponent {
  product = inject(ProductService).getCurrentProduct();
  currentUser = inject(UserService).getCurrentUser();
}`;

  ngAfterViewChecked(): void {
    Prism.highlightAll();
  }
}
