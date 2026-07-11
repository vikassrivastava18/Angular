import { Component, Input, Output, EventEmitter } from "@angular/core";
// import { CommonModule } from "@angular/common";
import { Item } from "./item.interface";

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})

export class ItemComponent {
  editable = false;

  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();

  saveItem(description: string) {
    if (!description) return;

    this.editable = false;
    this.item.todo = description;
  }
}