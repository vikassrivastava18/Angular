import { Component, inject } from "@angular/core";
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";
import { ToastService } from "./toast.service";

@Component({
  standalone: true,
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.css",
  imports: [RouterOutlet, Nav],
})

export class App {
  toastService = inject(ToastService);

}