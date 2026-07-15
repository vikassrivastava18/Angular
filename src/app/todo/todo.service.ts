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

}