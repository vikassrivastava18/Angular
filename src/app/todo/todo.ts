import { Component, inject, computed, signal } from '@angular/core';
import { ItemComponent } from "./item/item";
import { TodoService } from './todo.service';
import { Item } from './item/item.interface';


@Component({
  selector: 'app-todo',
  imports: [ItemComponent],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})

export class ToDo {
  componentTitle = "My To Do List";
  filter = signal<"all" | "active" | "done">("all");
  allTodos = signal<Item[]>([]);

  todoService = inject(TodoService)

  filteredTodos = computed(() => {
    const todos = this.allTodos();
    const currentFilter = this.filter();

    switch (currentFilter) {
      case 'active':
        return todos.filter((todo) => !todo.done);

      case 'done':
        return todos.filter((todo) => todo.done);

      default:
        return todos;
    }
  });

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.allTodos.set(todos);
    });
  }
}
