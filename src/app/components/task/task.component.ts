import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  public tasks: ITask[] = []; 

  private taskService = inject(TaskService)

  ngOnInit(): void {
    this.getAll()
  }

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

  private getAll() {
    this.taskService.getAll().subscribe({
      next: (data: ITask[]) => {
        this.tasks = data; 
        console.log("data fetched")
      },
      error: (err) => {
        console.error('An error has occured while trying to fetch the tasks :', err);
      }
    });
  }

  // private getById(id: number) {
    
  // }

 
}
