import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface IPerson {
  name: string;
}

export interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  done?: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  readonly url = 'http://localhost:8080/api'

  public todos: ITodoItem[] = [];
  public people: IPerson[]= [];

  constructor(private httpClient: HttpClient){}


  ngOnInit(){
    this.fetchPeople();
    this.fetchTodos();
  }


  get Todos(){
    return this.todos;
  }

  private async updateTodo(todo: ITodoItem){
    try{
      const updatedTodo = await this.httpClient.patch<ITodoItem>(`${this.url}/todos/${todo.id}`, todo).toPromise();
      this.todos = this.todos.map((value: ITodoItem) => (value.id === todo.id ? updatedTodo:value));
    }catch(error){
      console.log('Failed to update the Todo');
    }
  }

  private async fetchTodos(){
    try{
      this.todos = await this.httpClient.get<ITodoItem[]>(`${this.url}/todos`).toPromise();
    }catch (error){
      console.log('get Todo failed');
    }
  }

  private async fetchPeople(){
    try{
      this.people = await this.httpClient.get<IPerson[]>(`${this.url}/people`).toPromise();
    }catch (error){
      console.log('get People failed');
    }
  }
}
