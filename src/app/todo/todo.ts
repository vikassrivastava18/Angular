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
        return todos.filter((todo) => todo.status == "to");

      case 'done':
        return todos.filter((todo) => todo.status == "co");

      default:
        return todos;
    }
  });

  getAllTodos() {
    this.todoService.getTodos().subscribe({
      next: todos => this.allTodos.set(todos),
      error: err => console.log(`Failed to update item: ${err.message}`)
    })
  }

  ngOnInit() {
    this.getAllTodos()
  }

  addTodo(todo: string) {
    if (!todo.trim()) {
      return;
    }

    this.todoService.addTodo(todo).subscribe({
      next: (newTodo) => {
        this.allTodos.update((todos) => [newTodo, ...todos]);
      },
      error: err => console.log(`Failed to add item: ${err.message}`)
    });
  }

  removeTodo(id: number) {
    this.allTodos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  updateTodoItem(updatedTodo: Item) {
    this.allTodos.update((todos) =>
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }
}
