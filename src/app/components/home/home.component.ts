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
  currentPage: number = 0;
  totalPages: number = 0;
  limit: number = 10;

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

  loadGames(page: number = 0) {
    this.gameService.getAllGames(page, this.limit).subscribe(response => {
      this.games = response.content;
      this.filteredGames = [...this.games];
      this.currentPage = response.pageable.pageNumber;
      this.totalPages = response.totalPages
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

  previousPage() {
    if (this.currentPage > 0) {
      this.loadGames(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadGames(this.currentPage + 1);
    }
  }
}
