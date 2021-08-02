import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(): void{
  }

  getTodo(): Observable<Todo[]>{
    return this.http.get<Todo[]>('http://localhost:3000/todos/list');
  }

  addTodo(todo: Todo): Observable<Todo>{
    const headers = {'content-type':'application/json'};
    const body = JSON.stringify(todo);
    return this.http.post<Todo>('http://localhost:3000/todos/add', body, {'headers': headers});
  }

  updateTodo(todo: Todo): Observable<Todo>{
    const headers = {'content-type':'application/json'};
    const body = JSON.stringify(todo);
    return this.http.put<Todo>('http://localhost/todos/update', body, {'headers': headers})
  }

  remTodo(xval: string): Observable<any>{
    //const headers = {'contant-type': 'application/json'};
    //const xval1 = JSON.stringify(xval);
    return this.http.delete('http://localhost:3000/todos/delete/'+xval);
  }
}
