import { Component } from '@angular/core';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-root',
  imports: [TaskComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
