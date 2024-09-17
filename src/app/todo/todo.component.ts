import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  newTodo: string = '';
  todos: {
    task: string,
    isEditing: boolean,
    isCompleted: boolean,
  }[] = [];

  constructor() {}

  ngOnInit(): void {
    const savedTodo = localStorage.getItem('todos');
    if(savedTodo) {
      this.todos = JSON.parse(savedTodo);
    }

  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todos.push({
        task: this.newTodo,
        isEditing: false,
        isCompleted: false,
      });
      this.newTodo = '';
    } else {
      alert('The Title field is required.');
    }
    this.saveToLocalStorage();
  }

  removeTodo(index: number) {
    if (this.todos.length > 0) {
      this.todos.splice(index, 1);
    }
    this.saveToLocalStorage();
  }

  editTodo(index: number) {
    this.todos[index].isEditing = true;
    this.saveToLocalStorage();
  }

  saveTodo(index: number) {
    this.todos[index].isEditing = false;
    this.saveToLocalStorage();
  }

  completeTodo(index: number) {
    this.todos[index].isCompleted = !this.todos[index].isCompleted;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
