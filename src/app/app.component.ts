import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule, HomeComponent, FormsModule, HeaderComponent, FooterComponent, GameDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BackloggdFullStack';
  constructor() {}

}
