import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "./item/item.interface";



@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private api = 'http://127.0.0.1:8000/todo';
    private http = inject(HttpClient);

    getTodos(): Observable<Item[]> {
        return this.http.get<Item[]>(this.api + '/todos')
    }
}