import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../todo/todo.service';
import { ToastService } from '../toast.service';
import { Topic } from '../todo/item/item.interface';

@Component({
  selector: 'app-topic',
  imports: [],
  templateUrl: './topic.html',
  styleUrl: './topic.css',
})
export class TopicComponent {
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

