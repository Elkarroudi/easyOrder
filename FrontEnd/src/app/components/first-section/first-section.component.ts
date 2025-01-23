import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-first-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './first-section.component.html'
})

export class FirstSectionComponent {
  imageUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meal-g6g4CknJnXqj0ksQHzUtxuqvFaw6tk.png';
}
