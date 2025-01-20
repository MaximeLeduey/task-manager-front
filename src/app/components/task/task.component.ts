import { Component, OnInit } from '@angular/core';
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

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
   
  }

  public getAll() {
    this.taskService.getAll().subscribe({
      next: (data: ITask[]) => {
        this.tasks = data; 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches :', err);
      }
    });
  }

}
