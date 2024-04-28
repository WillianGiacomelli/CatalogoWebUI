import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrl: 'menu.component.css',
  standalone: true,
  imports: [RouterLink],
})
export class MenuComponent {}
