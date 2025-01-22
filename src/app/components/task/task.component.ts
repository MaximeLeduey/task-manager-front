import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/task.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  private taskService = inject(TaskService)

  public tasks$: Observable<ITask[]> = this.taskService.getAll()
  public selectedTask: ITask | null = null

  public delete(id: number) {
    this.taskService.delete(id).subscribe({
      next: (data: ITask) => {
        console.log(data + "has been deleted")
      },
      error: (err) => {
        console.error('An error has occured while trying to delete the task :', err);
      }
    });
  }

  public update(id: number, task: ITask) {
    this.taskService.update(id, task).subscribe({
      next: (data: ITask) => {
        console.log(data + "has been updated")
      },
      error: (err) => {
        console.error('An error has occured while trying to update the task :', err);
      }
    });
  }
 
}
