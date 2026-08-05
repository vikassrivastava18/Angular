import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { apiBaseUrl } from "../app.config";
import { Item, Topic } from "./item/item.interface";


@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private todoApi = `${apiBaseUrl}/todo/todos`;
    private topicApi = `${apiBaseUrl}/todo/topics`
    private http = inject(HttpClient);
    
    getTodos() {
        return this.http.get<Item[]>(this.todoApi);
    }

    addTodo(todo: string) {
        return this.http.post<Item>(this.todoApi, {
            todo,
            status: 'to'
        });
    }

    updateTodo(description: string, id: number, status: string) {
        const api = `${this.todoApi}/${id}` 
        return this.http.put<Item>(api, {
            id: id,
            todo: description,
            status: status            
        });
    }

    deleteTodo(id: number) {
        const api = `${this.todoApi}/${id}`;
        return this.http.delete<Item>(api);
    }

    getTopics() {
        return this.http.get<Topic[]>(this.topicApi);
    }
}