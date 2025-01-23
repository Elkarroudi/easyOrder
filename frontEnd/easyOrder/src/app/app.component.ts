import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FirstSectionComponent} from './components/first-section/first-section.component';
import {NavbarComponent} from './components/layouts/navbar/navbar.component';
import {FoodMenuComponent} from './components/food-menu/food-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FirstSectionComponent, NavbarComponent, FoodMenuComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EasyOrder';
}
