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

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  private post() {
    this.taskService.post({id : 0, name : this.addForm.value.name as string, isCompleted : false})
    .subscribe({
      next: (data: ITask) => {
        console.log("task " + data.name + " has been saved")
        this.refresh()
      },
      error: (err) => {
        console.error('An error has occured while trying to send the task :', err);
      }
    })
  }

  private update(task: ITask) {
    this.taskService.update(task).subscribe({
      next: (data: ITask) => {
        console.log("task " + data.name + " has been updated")
        this.refresh()
      },
      error: (err) => {
        console.error('An error has occured while trying to update the task :', err);
      }
    })
  }

  private refresh() {
    this.tasks$ = this.taskService.getAll()
  }

  delete(id: number) {
    this.taskService.delete(id).subscribe({
      next: (data: ITask) => {
        console.log("task " + data.name + " has been deleted")
        this.refresh()
      },
      error: (err) => {
        console.error('An error has occured while trying to delete the task :', err);
      }
    })
  }


  onCheck(task: ITask) {
    if(task.isCompleted == false) {
      task.isCompleted = true
    }
    else {
      task.isCompleted = false
    }

    this.update(task)
  }

  onSubmit() {
    this.addForm.markAllAsTouched()
    if(this.addForm.valid) {
      this.post()
    }
  } 

  onUpdate() {
    this.updateForm.markAllAsTouched()
    if(this.updateForm.valid && this.updateForm.value.name != this.selectedTask?.name && this.selectedTask) {
      this.update({id: this.selectedTask.id, name: this.updateForm.value.name as string, isCompleted: this.selectedTask.isCompleted})
      this.refresh()
    }
  }

  closeModal() {
    this.selectedTask = null;
    this.updateForm.reset(); 
    this.updateForm.markAsPristine(); 
    this.updateForm.markAsUntouched(); 
  }
}
