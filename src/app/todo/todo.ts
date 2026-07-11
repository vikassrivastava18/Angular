import { Component, inject } from '@angular/core';
import { Item } from "./item/item.interface";
import { ItemComponent } from "./item/item";
import { TodoService } from './todo.service';


@Component({
  selector: 'app-todo',
  imports: [ItemComponent],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})

export class ToDo {
  componentTitle = "My To Do List";
  filter: "all" | "active" | "done" = "all";

  todoService = inject(TodoService)

  ngOnInit() {
    this.todoService.getTodos();
  }

}
