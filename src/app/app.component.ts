import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], 
  template: `
    <div>
      <h1>Welcome to {{ title }}</h1>
      
      @if (!isLoggedIn) {
        <div style="padding: 20px;">
          <p>Please log in</p>
        </div>
      }
      
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`/* стили */`]
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn = false;
}