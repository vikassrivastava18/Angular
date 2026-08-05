import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../todo.service';
import { ToastService } from '../../toast.service';
import { Topic } from '../item/item.interface';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  topics = signal<Topic[]>([])

  todoService = inject(TodoService)
  toastService = inject(ToastService)

  ngOnInit() {
    this.getAllTopics()
  }

  getAllTopics() {
    this.todoService.getTopics().subscribe({
      next: topics => this.topics.set(topics),
      error: err => this.toastService.show('error', err.message)
    })
  }
}
