import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/task.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  private taskService = inject(TaskService)

  tasks$: Observable<ITask[]> = this.taskService.getAll()
  selectedTask: ITask | null = null

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  add() {

  }

  delete(id: number) {
    this.taskService.delete(id).subscribe({
      next: (data: ITask) => {
        console.log(data + "has been deleted")
      },
      error: (err) => {
        console.error('An error has occured while trying to delete the task :', err);
      }
    });
  }

  update(id: number, task: ITask) {
    this.taskService.update(id, task).subscribe({
      next: (data: ITask) => {
        console.log(data + "has been updated")
      },
      error: (err) => {
        console.error('An error has occured while trying to update the task :', err);
      }
    });
  }

  onSubmit() {
    console.log(this.formGroup.value)
  }
 
}
