import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-mongodb-crud',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './mongodb-crud.component.html',
  styleUrl: './mongodb-crud.component.scss'
})
export class MongodbCrudComponent {
  // Component content will be added here
}
