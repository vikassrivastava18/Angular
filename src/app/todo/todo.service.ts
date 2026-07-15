import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Item } from "./item/item.interface";


@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private api = 'http://127.0.0.1:8000/todo/todos';
    private http = inject(HttpClient);
    
    getTodos() {
        return this.http.get<Item[]>(this.api);
    }

    addTodo(todo: string) {
        return this.http.post<Item>(this.api, {
            todo,
            status: 'to'
        });
    }

    updateTodo(description: string, id: number, status: string) {
        const api = `${this.api}/${id}` 
        return this.http.put<Item>(api, {
            id: id,
            todo: description,
            status: status            
        });
    }

    deleteTodo(id: number) {
        const api = `${this.api}/${id}`;
        return this.http.delete<Item>(api);
    }
}