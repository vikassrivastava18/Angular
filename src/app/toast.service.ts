import { Injectable, signal } from "@angular/core";

export interface ToastData {
    message: string;
    type: 'success' | 'error' | 'info';
}

@Injectable({
    providedIn: 'root',
})

export class ToastService {
    toast = signal<ToastData | null>(null);

    show(message: string, type: 'success' | 'error' | 'info' = 'info') {
        this.toast.set({ message, type });
        // Automatically clear the toast after 3 seconds
        setTimeout(() => {
            this.clear()
        }, 2000);
    }

    clear() {
        this.toast.set(null)
    }
}