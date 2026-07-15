import { Component, Input, Output, EventEmitter, inject, signal } from "@angular/core";
// import { CommonModule } from "@angular/common";
import { Item } from "./item.interface";
import { TodoService } from "../todo.service";

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})

export class ItemComponent {
  editable = signal(false);

  todoService = inject(TodoService)

  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();
  @Output() statusChanged = new EventEmitter<Item>();

  startEditing() {
    this.editable.set(true);
  }

  finishEditing() {
    this.editable.set(false);
  }

  toggleItemStatus(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const status = checked ? 'co' : 'to';

    this.updateItem(this.item.todo, this.item.id, status);
  }

  updateItem(description: string, id: number, status: string) {
    if (!description) return;

    this.todoService.updateTodo(description, id, status).subscribe((todo) => {
      this.item.todo = todo.todo;
      this.item.status = todo.status;
      this.statusChanged.emit(this.item);
      this.finishEditing();
    });
  }

  deleteItem(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.remove.emit(this.item);
      this.finishEditing();
    });
  }
}