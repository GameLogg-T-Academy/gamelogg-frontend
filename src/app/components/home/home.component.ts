import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Game } from '../../model/game.model';
import { GameloggService } from '../../service/gamelogg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {
  currentUser!: User;
  user!: User;
  games: Game[] = [];
  constructor(private gameService: GameloggService) {}

  ngOnInit() {
    this.loadGames()
  }

  loadGames() {
      this.gameService.getAllGames().subscribe(games => {
        this.games = games;
      });
  }
}
