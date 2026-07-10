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
  allItems: Item[] = [];

  todoService = inject(TodoService)

  ngOnInit() {
    this.todoService.getTodos().subscribe({
    next: todos => {
      console.log("Todos: ", todos);
      this.allItems = todos
    }
  });
  }

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done,
    );
  };

  addItem(description: string) {
    if (!description) return;
    this.allItems.unshift({
      description,
      done: false,
      id: 1
    });
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
}
