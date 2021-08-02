import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { AppService } from '../app.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.refreshTodo();
  }

  name = '';
  details = '';
  contact = '';
  error = '';
  todos: Todo[] = [{
    name: 'abc',
    details: 'cc',
    contact: 'dd'
  }];
  todox: Todo[] = [];
  sent = false;
  setVar = {};
  senttodo = false;
  refreshTodo(){
    this.appService.getTodo().subscribe((data) => this.todos = data)
  }
  
  addTodo(){
    if(!this.name || !this.contact){
      this.error = '* Enter name and contact';
    } else{
    const todo = {
      name: this.name,
      details: this.details,
      contact: this.contact,
      senttodo: this.senttodo
    };
    var todos = this.todos;
    var axe = 1;
    //const todo1 = { name: 'Ganja', details: 'High', contact: 'fook'};
    
    
      
      for(let i=0;i<todos.length;i++){
        if(todos[i].name !== this.name){
          axe = axe +1;
        } else{
          axe = 0;
          break;
        }
      }
    if(axe > 0){
      this.appService.addTodo(todo).subscribe((data) => this.todos.push(data));
      this.refreshTodo();
      this.error =''; this.name='';this.details='';this.contact='';
    }  else{
      this.error = '* Name already exists';
    }
    //todos.push(todo)
    this.todos = todos;
    //todos.push(todo);
    console.log(todos);
    
    
  }
    
} 
updateTodo(xval: HTMLInputElement, aval: HTMLLIElement){
  const todo = {
    name: this.name,
    details: this.details,
    contact: this.contact,
    sentTodo: this.senttodo
  }
  if(xval.checked == true){
    this.senttodo = true;
    this.appService.updateTodo(todo).subscribe((data) => this.todos.push(todo));
    xval.setAttribute('disabled', 'true');
    aval.setAttribute('style','text-decoration: line-through');
  }
}
removeTodo(xval: Todo){
  this.appService.remTodo(xval.name).subscribe((data) => this.todos.filter((sata) => sata.name !== xval.name));
  this.refreshTodo();
} 
}


