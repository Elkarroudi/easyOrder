import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FirstSectionComponent} from './components/first-section/first-section.component';
import {NavbarComponent} from './components/layouts/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FirstSectionComponent, NavbarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EasyOrder';
}
