import { Component } from "@angular/core";
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.css",
  imports: [RouterOutlet],
})

export class App {
  
}