import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = "http://localhost:5160/"

  private http = inject(HttpClient)

  public getAll(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.baseUrl + "api/TodoItems"); 
  }

  public getById(id: number): Observable<ITask> {
    return this.http.get<ITask>(this.baseUrl + `api/TodoItems/${id}`)
  }

  public post(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.baseUrl + `api/TodoItems`, task)
  }

  public update(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(this.baseUrl + `api/TodoItems/${task.id}`, task)
  }

  public delete(id: number): Observable<ITask> {
    return this.http.delete<ITask>(this.baseUrl + `api/TodoItems/${id}`)
  }
}
