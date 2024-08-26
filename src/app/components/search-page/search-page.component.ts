import { Component } from '@angular/core';
import { Game } from '../../model/game.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameloggService } from '../../service/gamelogg.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  games: Game[] = [];
  currentPage: number = 0;
  itensPerPage: number = 10;
  totalPages: number = 0;
  genre: string = '';
  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameloggService
  ) {}

  ngOnInit(): void {
    const genre = this.route.snapshot.paramMap.get('genre');
    const title = this.route.snapshot.paramMap.get('title');
    if (genre) {
      this.genre = genre;
      this.gameService.getByGenre(genre, 0, this.itensPerPage).subscribe((data) => {
        this.games = data.content;
      });
    } else if (title) {
      this.title = title;
      this.gameService.getGameByName(title, 0, this.itensPerPage).subscribe(data => {
        this.games = data.content;
      })
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadGames(page);
  }

  loadGames(page: number = 0): void {
    this.gameService.getByGenre(this.genre, page, this.itensPerPage).subscribe(data => {
      this.games = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = page;
    });
  }
}
