import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Game } from '../../model/game.model';
import { GameloggService } from '../../service/gamelogg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {
  currentUser!: User;
  user!: User;
  games: Game[] = [];
  filteredGames: Game[] = [];
  isSidenavOpen: boolean = false;

  genreFilter: string = '';
  priceRangeFilter: number = 0;
  releaseYearFilter: string = '';

  constructor(private gameService: GameloggService) {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen
  }

  closeSidenav() {
    this.isSidenavOpen = false;
  }

  ngOnInit() {
    this.loadGames()
  }

  loadGames() {
      this.gameService.getAllGames().subscribe(games => {
        this.games = games;
        this.filteredGames = [...this.games];
      });
  }

  applyFilters() {
    this.filteredGames = this.games.filter(game => {
      const gameReleaseYear = new Date(game.releaseDate).getFullYear();
      return (this.genreFilter ? game.genre.includes(this.genreFilter) : true)
        && (this.priceRangeFilter ? game.price <= this.priceRangeFilter : true)
        && (this.releaseYearFilter ? gameReleaseYear === +this.releaseYearFilter : true);
    });
    this.closeSidenav();
  }

  clearFilters() {
    this.genreFilter = '';
    this.priceRangeFilter = 100;
    this.releaseYearFilter = '';
    this.filteredGames = [...this.games];
    this.closeSidenav();
  }
}
