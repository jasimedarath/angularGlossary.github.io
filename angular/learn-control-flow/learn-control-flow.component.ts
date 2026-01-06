import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-control-flow',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-control-flow.component.html',
  styleUrl: './learn-control-flow.component.scss',
})
export class LearnControlFlowComponent implements AfterViewChecked {
  ifSyntax: string = `// Old structural directive syntax
<div *ngIf="condition">Content</div>
<div *ngIf="condition; else elseBlock">Content</div>
<ng-template #elseBlock>Else content</ng-template>

// New @if syntax
@if (condition) {
  <div>Content</div>
}

@if (condition) {
  <div>Content</div>
} @else {
  <div>Else content</div>
}

// With else if
@if (score >= 90) {
  <div>Excellent!</div>
} @else if (score >= 70) {
  <div>Good job!</div>
} @else if (score >= 50) {
  <div>You passed!</div>
} @else {
  <div>Need improvement</div>
}`;

  forSyntax: string = `// Old *ngFor syntax
<div *ngFor="let item of items; index as i; trackBy: trackByFn">
  {{ i }}: {{ item.name }}
</div>

// New @for syntax
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

// With index and other variables
@for (item of items; track item.id; let i = $index) {
  <div>{{ i }}: {{ item.name }}</div>
}

// All available variables
@for (item of items; track item.id; 
     let i = $index;
     let first = $first;
     let last = $last;
     let even = $even;
     let odd = $odd;
     let count = $count) {
  <div [class.first]="first" [class.last]="last">
    Item {{ i + 1 }} of {{ count }}: {{ item.name }}
  </div>
}

// With empty block
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <div>No items found</div>
}`;

  switchSyntax: string = `// Old ngSwitch syntax
<div [ngSwitch]="value">
  <div *ngSwitchCase="'A'">Case A</div>
  <div *ngSwitchCase="'B'">Case B</div>
  <div *ngSwitchDefault>Default</div>
</div>

// New @switch syntax
@switch (value) {
  @case ('A') {
    <div>Case A</div>
  }
  @case ('B') {
    <div>Case B</div>
  }
  @default {
    <div>Default case</div>
  }
}

// Real-world example with enums
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

@switch (user.role) {
  @case (UserRole.Admin) {
    <admin-dashboard />
  }
  @case (UserRole.User) {
    <user-dashboard />
  }
  @case (UserRole.Guest) {
    <guest-view />
  }
  @default {
    <unauthorized-message />
  }
}`;

  trackingFunction: string = `// Component
@Component({
  template: \`
    @for (user of users; track user.id) {
      <user-card [user]="user" />
    }
  \`
})
export class UsersComponent {
  users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];
}

// Tracking by index (not recommended for dynamic lists)
@for (item of items; track $index) {
  <div>{{ item }}</div>
}

// Tracking by identity (for primitives)
@for (name of names; track name) {
  <div>{{ name }}</div>
}

// Tracking with custom expression
@for (item of items; track item.categoryId + '-' + item.id) {
  <div>{{ item.name }}</div>
}`;

  complexExample: string = `// Nested control flow with real-world scenario
@Component({
  template: \`
    <div class="user-list">
      @if (loading) {
        <spinner-component />
      } @else {
        @if (users.length > 0) {
          <div class="filters">
            @switch (selectedFilter) {
              @case ('active') {
                <span>Showing active users</span>
              }
              @case ('inactive') {
                <span>Showing inactive users</span>
              }
              @default {
                <span>Showing all users</span>
              }
            }
          </div>

          @for (user of filteredUsers(); track user.id; let i = $index) {
            <div class="user-card" [class.even]="i % 2 === 0">
              <h3>{{ user.name }}</h3>
              
              @if (user.isActive) {
                <badge>Active</badge>
              } @else {
                <badge color="gray">Inactive</badge>
              }

              @if (user.roles && user.roles.length > 0) {
                <div class="roles">
                  @for (role of user.roles; track role) {
                    <chip>{{ role }}</chip>
                  }
                </div>
              }

              @switch (user.subscriptionTier) {
                @case ('premium') {
                  <premium-features [user]="user" />
                }
                @case ('pro') {
                  <pro-features [user]="user" />
                }
                @default {
                  <basic-features [user]="user" />
                }
              }
            </div>
          } @empty {
            <div class="empty-state">
              No users match the current filter
            </div>
          }
        } @else {
          <div class="empty-state">
            <h3>No users found</h3>
            <button (click)="inviteUsers()">Invite Users</button>
          </div>
        }
      }
    </div>
  \`
})
export class UserListComponent {
  loading = signal(false);
  users = signal<User[]>([]);
  selectedFilter = signal<'all' | 'active' | 'inactive'>('all');

  filteredUsers = computed(() => {
    const filter = this.selectedFilter();
    const userList = this.users();
    
    if (filter === 'all') return userList;
    return userList.filter(u => 
      filter === 'active' ? u.isActive : !u.isActive
    );
  });
}`;

  performanceComparison: string = `// Benefits of new control flow:

1. BETTER PERFORMANCE
   - More optimized compiled code
   - Smaller bundle sizes
   - Faster change detection

2. BETTER TYPE CHECKING
   - Full TypeScript type inference
   - Compile-time error detection
   - Better IDE support

3. EASIER TO READ
   - More familiar syntax for developers
   - Less template syntax to learn
   - Better nesting visibility

4. REQUIRED TRACKING
   - @for requires explicit track expression
   - Prevents accidental performance issues
   - Forces developers to think about identity

// Performance example:
// Old: Angular needs to parse directives, manage structural contexts
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>

// New: Compiled to optimized update instructions
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}`;

  ngAfterViewChecked(): void {
    Prism.highlightAll();
  }
}
