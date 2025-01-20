import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = "http://localhost:5160/"

  constructor(private http: HttpClient) {
      
  }

  public getAll(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.baseUrl + "api/TodoItems"); 
  }
}
